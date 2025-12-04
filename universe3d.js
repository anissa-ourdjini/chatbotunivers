/**
 * 🌌 Universe 3D - Script Principal
 * Système Solaire Détaillé + Voie Lactée Interactive
 */

let scene, camera, renderer, controls;
let planets = [], orbits = [];
let galaxyGroup, systemGroup;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let lastFrameTime = Date.now();
let frameCount = 0;

const CONFIG = {
    autoRotate: true,
    showLabels: true,
    showOrbits: true,
    view: 'system'
};

const PLANETS = [
    { name: 'Mercure', size: 3.8, distance: 60, color: 0x8c7853, speed: 0.04, desc: 'Planète rocheuse la plus proche du Soleil' },
    { name: 'Vénus', size: 9.5, distance: 110, color: 0xffc649, speed: 0.015, desc: 'Jumelle de la Terre avec une atmosphère infernale' },
    { name: 'Terre', size: 10, distance: 150, color: 0x4da6ff, speed: 0.01, desc: 'Notre planète bleue, le seul monde connu avec la vie' },
    { name: 'Mars', size: 5.3, distance: 220, color: 0xe27b58, speed: 0.008, desc: 'La planète rouge, future destination' },
    { name: 'Jupiter', size: 110, distance: 780, color: 0xdaa520, speed: 0.002, desc: 'Géante gazeuse, plus grande planète' },
    { name: 'Saturne', size: 95, distance: 1430, color: 0xf4a460, speed: 0.0009, desc: 'Célèbre pour ses anneaux magnifiques', rings: true },
    { name: 'Uranus', size: 40, distance: 2870, color: 0x4fd0e7, speed: 0.0004, desc: 'Géante de glace qui tourne sur le côté' },
    { name: 'Neptune', size: 38, distance: 4497, color: 0x4166f5, speed: 0.0001, desc: 'Planète la plus lointaine et mystérieuse' }
];

function init() {
    console.log('🚀 INIT 3D START');
    
    try {
        // Vérifier Three.js
        if (typeof THREE === 'undefined') {
            console.error('❌ THREE.js n\'est pas chargé!');
            document.getElementById('loading').innerHTML = '<h1>❌ Erreur: Three.js non chargé</h1><p>Rechargez la page</p>';
            return;
        }
        console.log('✅ THREE.js détecté');

        // Récupérer le conteneur
        const container = document.getElementById('canvas-container');
        if (!container) {
            console.error('❌ Conteneur canvas non trouvé!');
            return;
        }
        console.log('✅ Conteneur trouvé');

    // Scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000814);
    scene.fog = new THREE.Fog(0x000814, 20000, 50000);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
    camera.position.set(500, 300, 500);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = CONFIG.autoRotate;
    controls.autoRotateSpeed = 1;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 50000;
    controls.minDistance = 100;

    // Lights
    const sunLight = new THREE.PointLight(0xffffff, 2, 100000);
    sunLight.position.set(0, 0, 0);
    sunLight.castShadow = true;
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    // Groups
    systemGroup = new THREE.Group();
    scene.add(systemGroup);

    galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    // Créer les éléments
    createSun();
    createPlanets();
    createGalaxy();
    createStarfield();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    document.querySelectorAll('input[name="view"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            CONFIG.view = e.target.value;
            updateVisualization();
        });
    });

    document.getElementById('autoRotate').addEventListener('change', (e) => {
        CONFIG.autoRotate = e.target.checked;
        controls.autoRotate = e.target.checked;
    });

    document.getElementById('showLabels').addEventListener('change', (e) => {
        CONFIG.showLabels = e.target.checked;
        planets.forEach(p => {
            if (p.label) p.label.visible = e.target.checked;
        });
    });

    document.getElementById('showOrbits').addEventListener('change', (e) => {
        CONFIG.showOrbits = e.target.checked;
        orbits.forEach(o => o.visible = e.target.checked);
    });

    // Cacher le loader
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 500);

    console.log('✅ INIT 3D COMPLÈTE - Animation démarrée');
    
    // Démarrer animation
    animate();
    } catch (error) {
        console.error('❌ ERREUR INIT:', error);
        document.getElementById('loading').innerHTML = `<h1>❌ Erreur 3D</h1><p>${error.message}</p>`;
    }
}

function createSun() {
    const geometry = new THREE.IcosahedronGeometry(50, 32);
    const material = new THREE.MeshStandardMaterial({
        color: 0xfdb813,
        emissive: 0xfdb813,
        emissiveIntensity: 1,
        roughness: 0.4,
    });
    const sun = new THREE.Mesh(geometry, material);
    sun.castShadow = true;
    sun.receiveShadow = true;

    // Glow
    const glowGeometry = new THREE.IcosahedronGeometry(52, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xfdb813,
        transparent: true,
        opacity: 0.2,
        side: THREE.BackSide,
    });
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    sun.add(glowMesh);

    systemGroup.add(sun);
    sun.userData.isPlanet = false;
}

function createPlanets() {
    PLANETS.forEach((data) => {
        // Orbite
        const orbitGeometry = new THREE.BufferGeometry();
        const orbitPoints = [];
        for (let i = 0; i <= 64; i++) {
            const angle = (i / 64) * Math.PI * 2;
            orbitPoints.push(
                Math.cos(angle) * data.distance,
                0,
                Math.sin(angle) * data.distance
            );
        }
        orbitGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(orbitPoints), 3));
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x444444, linewidth: 2 });
        const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
        systemGroup.add(orbit);
        orbits.push(orbit);

        // Planète
        const geometry = new THREE.IcosahedronGeometry(Math.max(data.size, 5), 32);
        const material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.7,
            metalness: 0.1,
        });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = data.distance;
        planet.castShadow = true;
        planet.receiveShadow = true;
        planet.userData = {
            isPlanet: true,
            name: data.name,
            desc: data.desc,
            distance: data.distance
        };

        // Anneaux Saturne
        if (data.rings) {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.5, data.size * 2.5, 64);
            const ringMaterial = new THREE.MeshStandardMaterial({
                color: 0xd4a574,
                roughness: 0.5,
                side: THREE.DoubleSide,
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI * 0.4;
            planet.add(rings);
        }

        // Label
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(data.name, 128, 40);

        const texture = new THREE.CanvasTexture(canvas);
        const labelGeometry = new THREE.PlaneGeometry(data.size * 4, data.size);
        const labelMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.y = data.size + 5;
        label.visible = CONFIG.showLabels;
        planet.add(label);
        planet.label = label;

        systemGroup.add(planet);
        planets.push({
            mesh: planet,
            data: data,
            angle: Math.random() * Math.PI * 2,
        });
    });
}

function createGalaxy() {
    // Étoiles de la Voie Lactée
    const starCount = 15000;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5000 + 100;
        const height = (Math.random() - 0.5) * 800;

        positions[i * 3] = Math.cos(angle) * radius;
        positions[i * 3 + 1] = height;
        positions[i * 3 + 2] = Math.sin(angle) * radius;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 8,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
    });

    const galaxyStars = new THREE.Points(geometry, material);
    galaxyGroup.add(galaxyStars);

    // Disque
    const diskGeometry = new THREE.ConeGeometry(6000, 200, 64);
    const diskMaterial = new THREE.MeshBasicMaterial({
        color: 0x2a5f8f,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
    });
    const disk = new THREE.Mesh(diskGeometry, diskMaterial);
    galaxyGroup.add(disk);

    galaxyGroup.visible = false;
}

function createStarfield() {
    const positions = new Float32Array(50000 * 3);
    for (let i = 0; i < 50000; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 100000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 100000;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 30,
        sizeAttenuation: true,
    });

    scene.add(new THREE.Points(geometry, material));
}

function updateVisualization() {
    systemGroup.visible = CONFIG.view === 'system' || CONFIG.view === 'both';
    galaxyGroup.visible = CONFIG.view === 'galaxy' || CONFIG.view === 'both';

    if (CONFIG.view === 'galaxy') {
        camera.position.set(0, 2000, 3000);
    } else {
        camera.position.set(500, 300, 500);
    }
    controls.target.set(0, 0, 0);
    controls.update();
}

function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(systemGroup.children, true);

    planets.forEach(p => {
        p.mesh.material.emissive.setHex(0x000000);
    });

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && !obj.userData.isPlanet) {
            obj = obj.parent;
        }

        if (obj.userData.isPlanet) {
            obj.material.emissive.setHex(0x00ffff);
            document.getElementById('planetName').textContent = obj.userData.name;
            document.getElementById('planetDesc').textContent = obj.userData.desc;
            document.getElementById('planetDetail').style.display = 'block';
            document.getElementById('currentPlanet').textContent = obj.userData.name;
        }
    } else {
        document.getElementById('planetDetail').style.display = 'none';
        document.getElementById('currentPlanet').textContent = '-';
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Animer les planètes
    planets.forEach((planet) => {
        planet.angle += planet.data.speed;
        planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
        planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
        planet.mesh.rotation.y += 0.003;
    });

    controls.update();
    updateStats();
    renderer.render(scene, camera);
}

function updateStats() {
    frameCount++;
    const now = Date.now();
    if (now - lastFrameTime >= 1000) {
        const fps = Math.round(frameCount * 1000 / (now - lastFrameTime));
        document.getElementById('fps').textContent = fps;
        frameCount = 0;
        lastFrameTime = now;
    }

    const zoomLevel = (camera.position.length() / 500).toFixed(2);
    document.getElementById('zoomLevel').textContent = zoomLevel + 'x';
    document.getElementById('objectCount').textContent = planets.length;
}

function resetCamera() {
    camera.position.set(500, 300, 500);
    controls.target.set(0, 0, 0);
    controls.update();
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => alert('Erreur fullscreen'));
    } else {
        document.exitFullscreen();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('load', () => {
    console.log('✅ Page chargée, initialisation 3D...');
    setTimeout(init, 500);
});
window.addEventListener('resize', onWindowResize);

// Fallback au cas où load ne se déclenche pas
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM chargé, initialisation 3D...');
        setTimeout(init, 500);
    });
} else {
    console.log('✅ DOM déjà prêt, initialisation immédiate...');
    setTimeout(init, 500);
}
