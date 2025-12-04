/* explorer3d-enhanced.js
   Version améliorée : matériaux PBR basiques, envMap, bloom, GUI, focus smoothing,
   labels, orbits, auto-rotate, mini-map. Génère textures procédurales pour les planètes
   afin d'éviter la dépendance à des assets externes.
*/
(function(){
    if (typeof THREE === 'undefined') { console.error('Three.js requis'); return; }

    let scene, camera, renderer, controls, composer;
    let miniCam, miniSize = 220;
    let planets = [];
    let orbits = [];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let clock = new THREE.Clock();
    let params = {
        autoRotate: true,
        showLabels: true,
        showOrbits: true,
        bloom: true,
        exposure: 1.0,
        bloomStrength: 0.9,
        bloomRadius: 0.4,
        bloomThreshold: 0.2
    };

    function init(){
        const container = document.getElementById('canvas-container');
        if (!container) { console.error('#canvas-container manquant'); return; }

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x00020a);

        camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight, 0.1, 200000);
        camera.position.set(800, 250, 1200);

        renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = params.exposure;
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Controls
        let OrbitControlsCtor = THREE.OrbitControls || (THREE.OrbitControls && THREE.OrbitControls.default) || window.OrbitControls;
        controls = OrbitControlsCtor ? new OrbitControlsCtor(camera, renderer.domElement) : null;
        if (controls){
            controls.enableDamping = true; controls.dampingFactor = 0.07;
            controls.autoRotate = params.autoRotate; controls.autoRotateSpeed = 0.6;
            controls.minDistance = 50; controls.maxDistance = 50000;
        }

        // Environment (cube map)
        const loader = new THREE.CubeTextureLoader();
        loader.setPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/cube/SwedishRoyalCastle/');
        const envMap = loader.load(['px.jpg','nx.jpg','py.jpg','ny.jpg','pz.jpg','nz.jpg']);
        envMap.encoding = THREE.sRGBEncoding;
        scene.environment = envMap;

        // Lights
        const hemi = new THREE.HemisphereLight(0xfff8e8, 0x080820, 0.4);
        scene.add(hemi);
        const sunLight = new THREE.PointLight(0xffffff, 4.0, 0, 2);
        sunLight.position.set(0,0,0);
        sunLight.castShadow = false;
        scene.add(sunLight);

        // Sun mesh (emissive)
        const sunGeo = new THREE.SphereGeometry(60, 32, 32);
        const sunMat = new THREE.MeshBasicMaterial({ color:0xffee88 });
        const sunMesh = new THREE.Mesh(sunGeo, sunMat);
        sunMesh.name = 'Soleil'; sunMesh.position.set(0,0,0);
        scene.add(sunMesh);

        // Create a starfield using shader-like sphere
        const starsGeo = new THREE.SphereGeometry(90000, 32, 32);
        const starsMat = new THREE.MeshBasicMaterial({
            map: generateStarTexture(),
            side: THREE.BackSide,
            transparent: false
        });
        const stars = new THREE.Mesh(starsGeo, starsMat);
        scene.add(stars);

        // System group
        const system = new THREE.Group(); system.name = 'system'; scene.add(system);

        const defs = [
            { name:'Mercure', size:4, dist:60, speed:0.04, color:'#8b7d6b' },
            { name:'Vénus', size:9.2, dist:110, speed:0.015, color:'#e0b070' },
            { name:'Terre', size:10, dist:150, speed:0.01, color:'#3b86d1' },
            { name:'Mars', size:5.6, dist:220, speed:0.008, color:'#c85a3a' },
            { name:'Jupiter', size:110, dist:780, speed:0.002, color:'#d3a25a' },
            { name:'Saturne', size:95, dist:1430, speed:0.0009, color:'#e3b86a', rings:true }
        ];

        defs.forEach(d => {
            const pivot = new THREE.Object3D(); pivot.name = d.name + '_pivot'; pivot.userData = { orbitRadius: d.dist };
            system.add(pivot);

            // orbit
            const curve = new THREE.EllipseCurve(0,0,d.dist,d.dist,0,2*Math.PI,false,0);
            const pts = curve.getPoints(256);
            const orbitGeo = new THREE.BufferGeometry().setFromPoints(pts.map(p=>new THREE.Vector3(p.x,0,p.y)));
            const orbitMat = new THREE.LineBasicMaterial({ color:0x2b3b45, linewidth:1.5 });
            const orbit = new THREE.Line(orbitGeo, orbitMat);
            orbit.visible = params.showOrbits; scene.add(orbit); orbits.push(orbit);

            const geo = new THREE.SphereGeometry(Math.max(d.size,4), 64, 64);
            const mat = new THREE.MeshStandardMaterial({ color: d.color, metalness:0.0, roughness:0.7, envMap: envMap, envMapIntensity:0.5 });
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(d.dist, 0, 0); mesh.castShadow = true; mesh.receiveShadow = true;
            mesh.userData = { name: d.name, desc: d.name + ' — ' + Math.round(d.dist) + ' units' };

            // procedural surface texture
            const tex = makePlanetTexture(d.color);
            tex.encoding = THREE.sRGBEncoding; tex.needsUpdate = true; mat.map = tex; mat.needsUpdate = true;

            // label
            const label = makeLabel(d.name);
            label.position.set(d.dist, d.size + 12, 0); label.visible = params.showLabels; scene.add(label);
            mesh.userData._label = label;

            // rings
            if (d.rings){
                const ringGeo = new THREE.RingGeometry(d.size*1.2, d.size*2.4, 64);
                const ringMat = new THREE.MeshStandardMaterial({ color:0xe6d4b3, side: THREE.DoubleSide, transparent:true, opacity:0.8 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI/2.4; ring.position.set(d.dist,0,0);
                scene.add(ring);
            }

            pivot.add(mesh);
            planets.push({ pivot, mesh, def:d, angle: Math.random()*Math.PI*2 });
        });

        // small asteroid belt
        createAsteroidBelt(system, 600, 1800, 350);

        // composer for bloom
        const renderScene = new THREE.RenderPass(scene, camera);
        const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), params.bloomStrength, params.bloomRadius, params.bloomThreshold);
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);

        // mini camera
        miniCam = new THREE.OrthographicCamera(-1000,1000,1000,-1000,0.1,200000);
        miniCam.position.set(0,2500,0); miniCam.up.set(0,0,-1); miniCam.lookAt(0,0,0);

        // GUI
        initGUI(bloomPass);

        // events
        window.addEventListener('resize', onWindowResize);
        renderer.domElement.addEventListener('mousemove', onMouseMove);
        renderer.domElement.addEventListener('click', onClick);

        // start
        animate();
        document.getElementById('loading').style.display = 'none';
    }

    function generateStarTexture(){
        const size = 1024;
        const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        const grd = ctx.createLinearGradient(0,0,0,size);
        grd.addColorStop(0, '#000010'); grd.addColorStop(1, '#000000');
        ctx.fillStyle = grd; ctx.fillRect(0,0,size,size);
        // random small stars
        for (let i=0;i<1200;i++){
            const x = Math.random()*size; const y = Math.random()*size; const r = Math.random()*1.2;
            ctx.fillStyle = 'rgba(255,255,255,'+(0.5+Math.random()*0.8)+')'; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
        }
        const tex = new THREE.CanvasTexture(canvas); tex.encoding = THREE.sRGBEncoding; return tex;
    }

    function makePlanetTexture(color){
        const size = 2048;
        const canvas = document.createElement('canvas'); canvas.width = size; canvas.height = size;
        const ctx = canvas.getContext('2d');
        // radial gradient
        const grad = ctx.createRadialGradient(size*0.35, size*0.25, size*0.2, size*0.5, size*0.5, size);
        grad.addColorStop(0, shadeColor(color, 0.15)); grad.addColorStop(0.6, color); grad.addColorStop(1, shadeColor(color, -0.3));
        ctx.fillStyle = grad; ctx.fillRect(0,0,size,size);
        // noise overlay
        const imageData = ctx.getImageData(0,0,size,size);
        for (let i=0;i<100000;i++){
            const x = Math.floor(Math.random()*size); const y = Math.floor(Math.random()*size);
            const idx = (y*size + x)*4; const v = 40 - Math.random()*80;
            imageData.data[idx] = Math.max(0, imageData.data[idx] + v);
            imageData.data[idx+1] = Math.max(0, imageData.data[idx+1] + v);
            imageData.data[idx+2] = Math.max(0, imageData.data[idx+2] + v);
        }
        ctx.putImageData(imageData,0,0);
        const tex = new THREE.CanvasTexture(canvas); tex.needsUpdate = true; return tex;
    }

    function shadeColor(col, percent){
        // col like '#rrggbb'
        const f=parseInt(col.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent;
        const R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        const newR = Math.round((t-R)*p)+R; const newG = Math.round((t-G)*p)+G; const newB = Math.round((t-B)*p)+B;
        return '#'+(0x1000000 + (newR<<16) + (newG<<8) + newB).toString(16).slice(1);
    }

    function makeLabel(text){
        const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 128;
        const ctx = canvas.getContext('2d'); ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = 'rgba(0,0,0,0)'; ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.font = '36px Arial'; ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center'; ctx.fillText(text, canvas.width/2, canvas.height/2+12);
        const tex = new THREE.CanvasTexture(canvas); const mat = new THREE.SpriteMaterial({ map: tex, transparent:true });
        const spr = new THREE.Sprite(mat); spr.scale.set(120,30,1); return spr;
    }

    function createAsteroidBelt(group, count, spread, inner){
        const g = new THREE.Group();
        const geom = new THREE.SphereGeometry(1,6,6);
        const mat = new THREE.MeshStandardMaterial({ color:0x8f8f8f, roughness:1 });
        for (let i=0;i<count;i++){
            const m = new THREE.Mesh(geom, mat);
            const a = Math.random()*Math.PI*2; const r = inner + Math.random()*spread;
            m.position.set(Math.cos(a)*r, (Math.random()-0.5)*40, Math.sin(a)*r);
            const s = 0.4 + Math.random()*2.4; m.scale.set(s,s,s); g.add(m);
        }
        group.add(g);
    }

    let focusTarget = null; let focusProgress = 0;
    function focusOn(mesh){ focusTarget = mesh; focusProgress = 0; }

    function onMouseMove(event){
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p=>p.mesh));
        const detail = document.getElementById('planetDetail');
        if (intersects.length>0){
            const mesh = intersects[0].object; const name = mesh.userData.name || '-';
            const pName = document.getElementById('planetName'); const pDesc = document.getElementById('planetDesc');
            if (detail && pName && pDesc){ detail.style.display='block'; pName.textContent = name; pDesc.textContent = mesh.userData.desc || '-'; }
        } else { if (detail){ detail.style.display='none'; } }
    }

    function onClick(){
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(planets.map(p=>p.mesh));
        if (intersects.length>0) focusOn(intersects[0].object);
    }

    function animate(){
        requestAnimationFrame(animate);
        const dt = Math.min(0.05, clock.getDelta());

        planets.forEach(p=>{
            p.angle += (p.def.speed || 0.01) * dt * 60;
            const x = Math.cos(p.angle) * p.def.dist; const z = Math.sin(p.angle) * p.def.dist;
            p.mesh.position.set(x, 0, z);
            if (p.mesh.userData._label){ p.mesh.userData._label.position.set(x, p.def.size + 12, z); p.mesh.userData._label.quaternion.copy(camera.quaternion); }
            p.mesh.rotation.y += 0.001 + (p.def.size*0.00001);
        });

        if (focusTarget){
            focusProgress = Math.min(1, focusProgress + dt*1.8);
            const desired = new THREE.Vector3().copy(focusTarget.position).add(new THREE.Vector3(0, Math.max(40, focusTarget.geometry.parameters.radius||50), Math.max(120, focusTarget.geometry.parameters.radius||120)));
            camera.position.lerp(desired, 0.06 + 0.6*focusProgress);
            if (controls && controls.target) controls.target.lerp(focusTarget.position, 0.08 + 0.6*focusProgress);
        }

        if (controls) controls.update();

        renderer.toneMappingExposure = params.exposure;
        if (params.bloom) composer.render(); else renderer.render(scene, camera);

        // mini map
        const size = Math.min(miniSize, Math.floor(window.innerWidth/5));
        renderer.setViewport(window.innerWidth - size - 10, 10, size, size);
        renderer.render(scene, miniCam);
        renderer.setViewport(0,0,window.innerWidth, window.innerHeight);

        // update UI stats
        const fpsEl = document.getElementById('fps'); if (fpsEl) fpsEl.textContent = Math.round(1/Math.max(0.0001, clock.getDelta()));
    }

    function onWindowResize(){
        camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
    }

    function initGUI(bloomPass){
        if (typeof GUI === 'undefined' && typeof dat === 'undefined' && (typeof lil === 'undefined')){
            // lil-gui is available via index file under global `GUI` sometimes; but use window.lil for safety
        }
        try{
            const gui = new window.GUI({ width: 300 });
            const f1 = gui.addFolder('Affichage');
            f1.add(params, 'autoRotate').onChange(v=>{ if (controls) controls.autoRotate = v; });
            f1.add(params, 'showLabels').onChange(v=>{ planets.forEach(p=>{ if (p.mesh.userData._label) p.mesh.userData._label.visible = v; }); });
            f1.add(params, 'showOrbits').onChange(v=>{ orbits.forEach(o=>o.visible = v); });
            f1.open();
            const f2 = gui.addFolder('Bloom');
            f2.add(params, 'bloom').name('Activer Bloom');
            f2.add(params, 'bloomStrength', 0, 3).onChange(v=>{ bloomPass.strength = v; });
            f2.add(params, 'bloomRadius', 0, 1).onChange(v=>{ bloomPass.radius = v; });
            f2.add(params, 'bloomThreshold', 0, 1).onChange(v=>{ bloomPass.threshold = v; });
            f2.open();
        }catch(e){ console.warn('GUI non disponible', e); }
    }

    // Start
    if (document.readyState === 'complete' || document.readyState === 'interactive') setTimeout(init, 200);
    else document.addEventListener('DOMContentLoaded', ()=> setTimeout(init, 200));
})();
