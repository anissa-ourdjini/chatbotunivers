/*
 * Explorer3D - Explorateur 3D amélioré
 * Fonctions principales:
 * - Mode Orbit / Fly (WASD) toggle
 * - Sélection d'objets (raycaster) affichant infos dans #info
 * - Mini-carte top-down (viewport secondaire)
 * - Génération procédurale d'objets (asteroides)
 * - Options: labels, orbites, auto-rotate
 */
(function(){
    if (typeof THREE === 'undefined') {
        console.error('Three.js requis pour explorer3d.js');
        return;
    }

    let scene, camera, renderer, controls;
    let miniCam, miniSize = 200;
    let planets = [];
    let orbits = [];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let clock = new THREE.Clock();
    let isFlyMode = false;
    let velocity = new THREE.Vector3();
    let moveState = { forward:false, back:false, left:false, right:false, up:false, down:false };

    const CONFIG = {
        autoRotate: true,
        showLabels: true,
        showOrbits: true
    };

    function init() {
        const container = document.getElementById('canvas-container');
        if (!container) {
            console.error('Conteneur #canvas-container manquant');
            return;
        }

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000814);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 200000);
        camera.position.set(500, 300, 600);

        renderer = new THREE.WebGLRenderer({ antialias:true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Controls (Orbit)
        let OrbitControlsCtor = THREE.OrbitControls || (THREE.OrbitControls && THREE.OrbitControls.default) || window.OrbitControls;
        if (!OrbitControlsCtor) {
            console.warn('OrbitControls non trouvé — inclure examples/js/controls/OrbitControls.js');
        }
        controls = OrbitControlsCtor ? new OrbitControlsCtor(camera, renderer.domElement) : { update: ()=>{} };
        if (controls) {
            controls.enableDamping = true;
            controls.dampingFactor = 0.08;
            controls.autoRotate = CONFIG.autoRotate;
            controls.autoRotateSpeed = 0.8;
            controls.minDistance = 50;
            controls.maxDistance = 100000;
        }

        // Lights
        const ambient = new THREE.AmbientLight(0x404050, 0.8);
        scene.add(ambient);
        const sunLight = new THREE.PointLight(0xffffff, 2, 0);
        sunLight.position.set(0,0,0);
        scene.add(sunLight);

        // Groups
        const systemGroup = new THREE.Group();
        systemGroup.name = 'system';
        scene.add(systemGroup);

        // Sun
        const sunGeo = new THREE.SphereGeometry(50, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffdd66 });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        sun.name = 'Soleil';
        systemGroup.add(sun);

        // Basic planet set (from existing definitions but simplified)
        const defs = [
            { name:'Mercure', size:3.8, dist:60, speed:0.04, color:0x8c7853 },
            { name:'Vénus', size:9.5, dist:110, speed:0.015, color:0xffc649 },
            { name:'Terre', size:10, dist:150, speed:0.01, color:0x4da6ff },
            { name:'Mars', size:5.3, dist:220, speed:0.008, color:0xe27b58 },
            { name:'Jupiter', size:110, dist:780, speed:0.002, color:0xdaa520 },
            { name:'Saturne', size:95, dist:1430, speed:0.0009, color:0xf4a460, rings:true }
        ];

        defs.forEach(d => {
            const pivot = new THREE.Object3D();
            pivot.name = d.name + '_pivot';
            pivot.userData = { orbitRadius: d.dist };
            systemGroup.add(pivot);

            // orbit line
            const curve = new THREE.EllipseCurve(0,0,d.dist,d.dist,0,2*Math.PI,false,0);
            const points = curve.getPoints(128);
            const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x,0,p.y)));
            const orbitMat = new THREE.LineBasicMaterial({ color:0x333333 });
            const orbit = new THREE.Line(orbitGeo, orbitMat);
            orbit.visible = CONFIG.showOrbits;
            systemGroup.add(orbit);
            orbits.push(orbit);

            const geo = new THREE.SphereGeometry(Math.max(d.size,4), 32, 32);
            const mat = new THREE.MeshStandardMaterial({ color: d.color, roughness:0.8 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(d.dist, 0, 0);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { name: d.name, desc: d.name + ' — distance ' + d.dist + ' units', radius: d.dist };

            // label (sprite)
            const label = makeLabel(d.name);
            label.position.set(d.dist, d.size + 8, 0);
            label.visible = CONFIG.showLabels;
            scene.add(label);
            mesh.userData._label = label;

            pivot.add(mesh);
            planets.push({ pivot, mesh, def:d, angle: Math.random()*Math.PI*2 });
        });

        // Procedural asteroid belt
        createAsteroidBelt(systemGroup, 400, 3500, 180);

        // Mini map camera (orthographic top-down)
        miniCam = new THREE.OrthographicCamera(-500, 500, 500, -500, 0.1, 10000);
        miniCam.position.set(0, 1000, 0);
        miniCam.up.set(0,0,-1);
        miniCam.lookAt(0,0,0);

        // UI events
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('click', onClick);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        // Toggle UI inputs
        const autoRotateEl = document.getElementById('autoRotate');
        if (autoRotateEl) autoRotateEl.addEventListener('change', e => { CONFIG.autoRotate = e.target.checked; if (controls) controls.autoRotate = e.target.checked; });
        const labelsEl = document.getElementById('showLabels');
        if (labelsEl) labelsEl.addEventListener('change', e => { CONFIG.showLabels = e.target.checked; planets.forEach(p => p.mesh.userData._label.visible = e.target.checked); });
        const orbitsEl = document.getElementById('showOrbits');
        if (orbitsEl) orbitsEl.addEventListener('change', e => { CONFIG.showOrbits = e.target.checked; orbits.forEach(o => o.visible = e.target.checked); });

        // Start loop
        animate();
    }

    function makeLabel(text){
        const canvas = document.createElement('canvas');
        canvas.width = 256; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = '#fff'; ctx.font = '28px Arial'; ctx.textAlign = 'center'; ctx.fillText(text, canvas.width/2, 38);
        const texture = new THREE.CanvasTexture(canvas);
        const mat = new THREE.SpriteMaterial({ map: texture, transparent:true });
        const spr = new THREE.Sprite(mat);
        spr.scale.set(40,10,1);
        return spr;
    }

    function createAsteroidBelt(group, count, radiusSpread, innerRadius){
        const geo = new THREE.SphereGeometry(1,6,6);
        const mat = new THREE.MeshStandardMaterial({ color:0x999999, roughness:1 });
        const belt = new THREE.Group();
        for (let i=0;i<count;i++){
            const m = new THREE.Mesh(geo, mat);
            const angle = Math.random()*Math.PI*2;
            const r = innerRadius + Math.random()*radiusSpread;
            m.position.set(Math.cos(angle)*r, (Math.random()-0.5)*20, Math.sin(angle)*r);
            m.scale.setScalar(0.5 + Math.random()*1.5);
            belt.add(m);
        }
        group.add(belt);
    }

    function onMouseMove(event){
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        // highlight on hover
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p=>p.mesh));
        const info = document.getElementById('info');
        if (intersects.length>0){
            const mesh = intersects[0].object;
            if (info) info.innerHTML = '<h3>🔭 '+mesh.userData.name+'</h3><p>'+mesh.userData.desc+'</p>';
        } else {
            if (info) info.innerHTML = '<h3>ℹ️ Infos Univers</h3><p>Bienvenue dans l\'Univers 3D!</p><p>Survolez un objet pour plus d\'infos.</p>';
        }
    }

    function onClick(event){
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p=>p.mesh));
        if (intersects.length>0){
            const mesh = intersects[0].object;
            focusOn(mesh);
        }
    }

    function focusOn(mesh){
        // simple immediate focus (no tween dependency)
        const offset = new THREE.Vector3(0, Math.max(40, (mesh.geometry.parameters.radius||mesh.userData.radius||40)), Math.max(80, (mesh.geometry.parameters.radius||mesh.userData.radius||80)));
        const target = new THREE.Vector3().copy(mesh.position).add(offset);
        camera.position.copy(target);
        if (controls && controls.target) controls.target.copy(mesh.position);
        if (controls && controls.update) controls.update();
    }

    function onKeyDown(e){
        if (e.code === 'KeyF') { isFlyMode = !isFlyMode; const mode = document.getElementById('info'); if (mode) mode.insertAdjacentHTML('beforeend','<div style="font-size:11px">Mode: '+(isFlyMode? 'Fly':'Orbit')+'</div>'); }
        if (e.code === 'KeyW') moveState.forward = true;
        if (e.code === 'KeyS') moveState.back = true;
        if (e.code === 'KeyA') moveState.left = true;
        if (e.code === 'KeyD') moveState.right = true;
        if (e.code === 'Space') moveState.up = true;
        if (e.code === 'ShiftLeft') moveState.down = true;
    }
    function onKeyUp(e){
        if (e.code === 'KeyW') moveState.forward = false;
        if (e.code === 'KeyS') moveState.back = false;
        if (e.code === 'KeyA') moveState.left = false;
        if (e.code === 'KeyD') moveState.right = false;
        if (e.code === 'Space') moveState.up = false;
        if (e.code === 'ShiftLeft') moveState.down = false;
    }

    function animate(){
        requestAnimationFrame(animate);
        const dt = clock.getDelta();

        // update orbits
        planets.forEach(p => {
            p.angle += (p.def.speed || 0.01) * dt * 60;
            const x = Math.cos(p.angle) * p.def.dist || p.def.dist;
            const z = Math.sin(p.angle) * p.def.dist || 0;
            p.mesh.position.set(x, 0, z);
            if (p.mesh.userData._label) {
                p.mesh.userData._label.position.set(x, p.def.size + 8, z);
                p.mesh.userData._label.quaternion.copy(camera.quaternion);
            }
            p.mesh.rotation.y += 0.002;
        });

        // Fly mode movement
        if (isFlyMode) {
            const acc = 800 * dt;
            if (moveState.forward) velocity.z -= acc;
            if (moveState.back) velocity.z += acc;
            if (moveState.left) velocity.x -= acc;
            if (moveState.right) velocity.x += acc;
            if (moveState.up) velocity.y += acc;
            if (moveState.down) velocity.y -= acc;
            // damp
            velocity.multiplyScalar(0.95);
            const dir = new THREE.Vector3();
            camera.getWorldDirection(dir);
            camera.position.add(dir.clone().multiplyScalar(-velocity.z*dt));
            camera.position.add(new THREE.Vector3(velocity.x*dt, velocity.y*dt, 0));
        }

        if (controls && controls.update) controls.update();

        // render main
        renderer.setViewport(0,0,window.innerWidth, window.innerHeight);
        renderer.clear();
        renderer.render(scene, camera);

        // render mini map overlay
        const size = Math.min(miniSize, Math.floor(window.innerWidth/5));
        renderer.setViewport(window.innerWidth - size - 10, 10, size, size);
        renderer.render(scene, miniCam);

        // update stats
        const fpsEl = document.getElementById('fps');
        if (fpsEl) fpsEl.textContent = Math.round(1/Math.max(0.0001, clock.getDelta()));
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Start when DOM ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(init, 200);
    else document.addEventListener('DOMContentLoaded', () => setTimeout(init, 200));
})();
