// Simple 3D Solar System using Three.js
// Creates orbiting planets, clickable to show details via existing showPlanetInfo
(function(){
    function init() {
        if (typeof THREE === 'undefined') { console.warn('Three.js not loaded'); return; }
        const container = document.getElementById('solar3d');
        if (!container) return;

        const width = container.clientWidth || window.innerWidth;
        const height = container.clientHeight || 520;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000010);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
        camera.position.set(0, 220, 700);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.setSize(width, height);
        renderer.shadowMap.enabled = true;
        renderer.outputColorSpace = THREE.SRGBColorSpace || renderer.outputEncoding; // compatibility
        container.innerHTML = '';
        container.appendChild(renderer.domElement);

        // Create OrbitControls safely — some builds attach it differently or not at all
        let OrbitControlsCtor = null;
        if (typeof THREE !== 'undefined') {
            OrbitControlsCtor = THREE.OrbitControls || (THREE.OrbitControls && THREE.OrbitControls.default) || null;
        }
        if (!OrbitControlsCtor && typeof window !== 'undefined') {
            OrbitControlsCtor = window.OrbitControls || null;
        }

        let controls;
        if (OrbitControlsCtor) {
            controls = new OrbitControlsCtor(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            // center controls on the sun
            try { if (controls.target) controls.target.set(0,0,0); controls.update(); } catch(e){}
        } else {
            console.warn('OrbitControls not available — falling back to non-interactive camera');
            controls = { update: function(){} };
        }

        // starfield background
        // starfield background (multiple layers, animated)
        const _starFields = [];
        try {
            const layers = [ {count:3500, size:1, spread:2400}, {count:1200, size:1.6, spread:1400}, {count:600, size:2.6, spread:900} ];
            layers.forEach(layer => {
                const starsGeo = new THREE.BufferGeometry();
                const starCount = layer.count;
                const positions = new Float32Array(starCount * 3);
                for (let i=0;i<starCount;i++){
                    const r = (layer.spread*0.5) + Math.random()*layer.spread;
                    const theta = Math.random()*Math.PI*2;
                    const phi = (Math.random()-0.5)*Math.PI;
                    positions[i*3] = Math.cos(theta)*Math.cos(phi)*r;
                    positions[i*3+1] = Math.sin(phi)*r*0.5;
                    positions[i*3+2] = Math.sin(theta)*Math.cos(phi)*r;
                }
                starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                const starsMat = new THREE.PointsMaterial({ color: 0xffffff, size: layer.size, sizeAttenuation: true, opacity: 0.9, transparent: true });
                const starField = new THREE.Points(starsGeo, starsMat);
                starField.userData._spin = 0.0002 + Math.random()*0.0006;
                scene.add(starField);
                _starFields.push(starField);
            });
        } catch(e) { console.warn('starfield failed', e); }

        // Lights + Sun
        const hemi = new THREE.HemisphereLight(0xffffee, 0x080820, 0.35);
        scene.add(hemi);

        const loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';

        // Helper: create a sprite label using canvas texture
        function createTextLabel(text) {
            const canvas = document.createElement('canvas');
            const width = 512, height = 128;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            // transparent background
            ctx.clearRect(0, 0, width, height);
            // drop shadow
            ctx.font = '36px Helvetica, Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'white';
            ctx.shadowColor = 'rgba(0,0,0,0.7)';
            ctx.shadowBlur = 8;
            ctx.fillText(text, width/2, height/2 + 12);
            const tex = new THREE.CanvasTexture(canvas);
            tex.needsUpdate = true;
            const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
            const spr = new THREE.Sprite(mat);
            spr.scale.set(40, 10, 1);
            return spr;
        }

        // Sun as emissive sphere + point light
        const sunGeo = new THREE.SphereGeometry(40, 64, 64);
        const sunMat = new THREE.MeshBasicMaterial({ color: 0xffee88 });
        const sun = new THREE.Mesh(sunGeo, sunMat);
        scene.add(sun);

        const sunLight = new THREE.PointLight(0xfff1c7, 2.5, 5000, 2);
        sunLight.position.set(0,0,0);
        scene.add(sunLight);

        // soft glow sprite for sun
        try {
            const spriteMap = loader.load('https://upload.wikimedia.org/wikipedia/commons/2/2c/Yellow_diffuse.png');
            const spriteMat = new THREE.SpriteMaterial({ map: spriteMap, color: 0xfff3c6, transparent: true, opacity: 0.6 });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(180,180,1);
            sprite.position.set(0,0,0);
            scene.add(sprite);
        } catch(e) {}

        // Planet definitions (radius scale and speed)
        const defs = [
            { key: 'mercure', size: 4, radius: 70, speed: 0.04 },
            { key: 'venus', size: 6, radius: 95, speed: 0.028 },
            { key: 'terre', size: 6.5, radius: 120, speed: 0.02 },
            { key: 'mars', size: 5, radius: 150, speed: 0.017 },
            { key: 'jupiter', size: 14, radius: 200, speed: 0.01 },
            { key: 'saturne', size: 12, radius: 260, speed: 0.008 },
            { key: 'uranus', size: 10, radius: 310, speed: 0.006 },
            { key: 'neptune', size: 10, radius: 360, speed: 0.005 }
        ];

        const planets = {}; // key -> {mesh,pivot,def}

        // Map of preferred colors for fallback when textures aren't available
        const fallbackColors = {
            mercure: 0x8b7355,
            venus: 0xffc66b,
            terre: 0x4fb0e8,
            mars: 0xe04b3b,
            jupiter: 0xc69a6b,
            saturne: 0xf0d2a0,
            uranus: 0x7fe0dd,
            neptune: 0x3c69e0
        };

        defs.forEach(d => {
            const pivot = new THREE.Object3D();
            scene.add(pivot);

            const geo = new THREE.SphereGeometry(d.size, 32, 32);
            // try to load texture from astronomyKnowledge
            let mat;
            const url = (window.astronomyKnowledge && astronomyKnowledge.planetes && astronomyKnowledge.planetes[d.key] && astronomyKnowledge.planetes[d.key].image)
                    ? astronomyKnowledge.planetes[d.key].image
                    : null;

            if (url) {
                // try to use texture, but fallback gracefully
                try {
                    const tex = loader.load(url);
                    mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 1.0, metalness: 0.0 });
                } catch (e) {
                    mat = new THREE.MeshStandardMaterial({ color: fallbackColors[d.key] || 0x888888 });
                }
            } else {
                mat = new THREE.MeshStandardMaterial({ color: fallbackColors[d.key] || 0x888888 });
            }

            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(d.radius, 0, 0);
            mesh.userData = { key: d.key };
            pivot.add(mesh);

            // add a simple label sprite above each planet
            try {
                const label = createTextLabel((astronomyKnowledge.planetes[d.key] && astronomyKnowledge.planetes[d.key].nom) || d.key);
                label.position.set(d.radius, d.size + 8, 0);
                scene.add(label);
                mesh.userData._label = label;
            } catch(e) {}

            // optional ring for Saturn
            if (d.key === 'saturne') {
                const ringGeo = new THREE.RingGeometry(d.size + 2, d.size + 6, 64);
                const ringMat = new THREE.MeshBasicMaterial({ color: 0xaaaa88, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                mesh.add(ring);
            }

            // small atmosphere for Earth
            if (d.key === 'terre') {
                const atmGeo = new THREE.SphereGeometry(d.size + 0.8, 32, 32);
                const atmMat = new THREE.MeshPhongMaterial({ color: 0x66ccff, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
                const atm = new THREE.Mesh(atmGeo, atmMat);
                mesh.add(atm);
            }

            planets[d.key] = { mesh, pivot, def: d };
        });

        // Orbits: draw simple circles
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444 });
        defs.forEach(d => {
            const curve = new THREE.EllipseCurve(0,0,d.radius,d.radius,0,2*Math.PI,false,0);
            const points = curve.getPoints(128);
            const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(p => new THREE.Vector3(p.x,0,p.y)));
            const orbitLine = new THREE.Line(orbitGeo, orbitMaterial);
            scene.add(orbitLine);
        });

        // Raycaster for clicks
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        function onClick(event) {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            raycaster.setFromCamera(mouse, camera);
            const allMeshes = Object.values(planets).map(p => p.mesh);
            const intersects = raycaster.intersectObjects(allMeshes);
            if (intersects.length > 0) {
                const mesh = intersects[0].object;
                const key = mesh.userData.key;
                if (key && window.showPlanetInfo) {
                    // call existing modal function
                    showPlanetInfo(key);
                }
            }
        }

        renderer.domElement.addEventListener('click', onClick);

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            Object.values(planets).forEach(p => {
                p.pivot.rotation.y += p.def.speed * 0.5;
                p.mesh.rotation.y += 0.01;
                // make label face the camera
                try {
                    const lbl = p.mesh.userData && p.mesh.userData._label;
                    if (lbl) lbl.quaternion.copy(camera.quaternion);
                } catch(e) {}
            });
            // rotate starfields slowly for parallax
            try {
                _starFields.forEach(sf => { sf.rotation.y += sf.userData._spin || 0.0003; });
            } catch(e) {}
            controls.update();
            renderer.render(scene, camera);
        }

        // Resize handling
        window.addEventListener('resize', () => {
            const w = container.clientWidth || window.innerWidth;
            const h = container.clientHeight || 520;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        });

        animate();
    }

    // Wait for DOM and for astronomyKnowledge to be available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        setTimeout(init, 300);
    } else {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 300));
    }
})();
