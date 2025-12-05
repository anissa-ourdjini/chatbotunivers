// Visualisation 3D interactive de la Voie Lactée avec Three.js

let galaxyScene, galaxyCamera, galaxyRenderer;
let galaxyStars = [];
let galaxyCenter;

function initMilkyWay3D() {
    const container = document.getElementById('galaxyContainer3d');
    if (!container || container.children.length > 0) return;

    // Scène avec dégradé background plus clair et vibrant
    galaxyScene = new THREE.Scene();
    galaxyScene.background = new THREE.Color(0x0f0f2e);
    galaxyScene.fog = new THREE.FogExp2(0x0f0f2e, 0.00001);

    // Caméra - centrée et positionnée optimalement
    const width = container.clientWidth;
    const height = container.clientHeight;
    galaxyCamera = new THREE.PerspectiveCamera(70, width / height, 0.1, 200000);
    galaxyCamera.position.set(0, 35000, 45000);
    galaxyCamera.lookAt(0, 0, 0);

    // Rendu haute qualité
    galaxyRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: 'highp' });
    galaxyRenderer.setSize(width, height);
    galaxyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    galaxyRenderer.shadowMap.enabled = true;
    galaxyRenderer.shadowMap.type = THREE.PCFShadowShadowMap;
    container.appendChild(galaxyRenderer.domElement);

    // Lumière ambiante très brillante
    const ambientLight = new THREE.AmbientLight(0xaabbff, 1.5);
    galaxyScene.add(ambientLight);

    // Lumière directionnelle pour effet dramatique
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(20000, 15000, 20000);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    galaxyScene.add(directionalLight);

    // Point light intense au centre pour illuminer le noyau
    const coreLight = new THREE.PointLight(0xffff99, 5.5, 100000);
    coreLight.position.set(0, 0, 0);
    galaxyScene.add(coreLight);

    // Lumières colorées supplémentaires
    const redLight = new THREE.PointLight(0xff8888, 2.5, 80000);
    redLight.position.set(30000, 10000, 0);
    galaxyScene.add(redLight);

    const blueLight = new THREE.PointLight(0x88bbff, 2.5, 80000);
    blueLight.position.set(-30000, 10000, 0);
    galaxyScene.add(blueLight);

    const greenLight = new THREE.PointLight(0x88ff88, 2.0, 70000);
    greenLight.position.set(0, 25000, 0);
    galaxyScene.add(greenLight);

    // Créer les bras spiraux
    createSpiralArms();

    // Créer le noyau
    createGalaxyCore();

    // Créer les étoiles
    createGalaxyStars();

    // Ajouter le Soleil
    addSun();

    // Contrôles de la souris
    addGalaxyControls();

    // Animation
    animateMilkyWay();

    // Gestion du redimensionnement
    window.addEventListener('resize', onWindowResizeGalaxy);
}

function createSpiralArms() {
    const armCount = 4;
    const armData = [
        { angle: 0, color: 0x4488ff },      // Bras bleu
        { angle: Math.PI/2, color: 0xff8844 },  // Bras orange
        { angle: Math.PI, color: 0x88ff44 },   // Bras vert
        { angle: 3*Math.PI/2, color: 0xff44ff } // Bras magenta
    ];

    for (let arm = 0; arm < armCount; arm++) {
        const positions = [];
        const colors = [];
        const startAngle = armData[arm].angle;
        const armColor = new THREE.Color(armData[arm].color);

        // Créer les particules le long du bras spiral
        for (let i = 0; i < 5000; i++) {
            const progress = i / 5000;
            const angle = startAngle + progress * Math.PI * 2.5; // Spiral tighter
            const radius = 2000 + progress * 48000;
            
            // Distribution gaussienne du disque
            const height = (Math.random() - 0.5) * 8000 * Math.exp(-progress * 2);
            const scatter = (Math.random() - 0.5) * 6000 * Math.exp(-progress * 1.5);
            
            positions.push(
                Math.cos(angle) * (radius + scatter),
                height + (Math.random() - 0.5) * 1000,
                Math.sin(angle) * (radius + scatter)
            );
            
            // Gradient de couleur le long du bras
            const intensity = Math.exp(-progress * 0.5);
            colors.push(
                armColor.r * intensity,
                armColor.g * intensity,
                armColor.b * intensity
            );
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));

        const material = new THREE.PointsMaterial({
            size: 320,
            vertexColors: true,
            sizeAttenuation: true,
            transparent: true,
            opacity: 1.0,
            sizeScale: window.devicePixelRatio
        });

        const armPoints = new THREE.Points(geometry, material);
        galaxyScene.add(armPoints);
    }
}

function createGalaxyCore() {
    // Trou noir supermassif (Sagittarius A*)
    const blackHoleGeometry = new THREE.SphereGeometry(600, 32, 32);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({
        color: 0x000000
    });
    
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    galaxyScene.add(blackHole);

    // Halo d'accrétion avec glow intense
    const haloGeometry = new THREE.IcosahedronGeometry(5000, 6);
    const haloMaterial = new THREE.MeshPhongMaterial({
        color: 0xff8844,
        emissive: 0xffaa66,
        emissiveIntensity: 2.0,
        shininess: 200,
        transparent: true,
        opacity: 0.7
    });
    
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    galaxyScene.add(halo);

    // Disque d'accrétion ultra-réaliste
    const diskGeometry = new THREE.BufferGeometry();
    const diskPositions = [];
    const diskColors = [];
    
    for (let i = 0; i < 50000; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = 1000 + Math.random() * 12000;
        const height = (Math.random() - 0.5) * 1200;

        diskPositions.push(
            Math.cos(angle) * radius,
            height,
            Math.sin(angle) * radius
        );

        // Gradient de couleur réaliste: bleu -> blanc -> orange -> rouge
        const intensity = 1 - (radius - 1000) / 12000;
        const hue = 0.1 + intensity * 0.5; // Bleu à rouge
        const color = new THREE.Color().setHSL(hue, 1, 0.5 + intensity * 0.3);
        diskColors.push(color.r, color.g, color.b);
    }

    diskGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(diskPositions), 3));
    diskGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(diskColors), 3));
    
    const diskMaterial = new THREE.PointsMaterial({
        size: 220,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeScale: window.devicePixelRatio
    });

    const diskPoints = new THREE.Points(diskGeometry, diskMaterial);
    galaxyScene.add(diskPoints);

    // Gaz interstellaire (poussière volumétrique)
    createInterstellarGas();
    
    galaxyCenter = blackHole;
}

function createGalaxyStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    const starColors = [];
    
    // Créer 150000 étoiles distribuées réalistement
    for (let i = 0; i < 150000; i++) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI * 0.4;
        const radius = 3000 + Math.random() * Math.random() * 50000; // Distribution réaliste
        
        starPositions.push(
            Math.cos(angle) * Math.cos(elevation) * radius,
            Math.sin(elevation) * radius * 0.3, // Disque aplati
            Math.sin(angle) * Math.cos(elevation) * radius
        );
        
        // Température réaliste des étoiles: bleu, blanc, jaune, rouge
        const temp = Math.random();
        let color;
        if (temp < 0.15) {
            color = new THREE.Color(0x4488ff); // Bleu (chaud)
        } else if (temp < 0.4) {
            color = new THREE.Color(0xffffff); // Blanc
        } else if (temp < 0.7) {
            color = new THREE.Color(0xffdd88); // Jaune
        } else {
            color = new THREE.Color(0xff8844); // Rouge (froid)
        }
        
        starColors.push(color.r, color.g, color.b);
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(starPositions), 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(starColors), 3));
    
    const starMaterial = new THREE.PointsMaterial({
        size: 200,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 1.0,
        sizeScale: window.devicePixelRatio
    });
    
    galaxyStars = new THREE.Points(starGeometry, starMaterial);
    galaxyScene.add(galaxyStars);
}

function createInterstellarGas() {
    const gasGeometry = new THREE.BufferGeometry();
    const gasPositions = [];
    const gasColors = [];
    
    for (let i = 0; i < 100000; i++) {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI * 0.3;
        const radius = 5000 + Math.random() * 45000;
        
        gasPositions.push(
            Math.cos(angle) * Math.cos(elevation) * radius,
            Math.sin(elevation) * radius,
            Math.sin(angle) * Math.cos(elevation) * radius
        );
        
        // Teintes de gaz: bleu-violet-rouge
        const type = Math.random();
        let color;
        if (type < 0.4) {
            color = new THREE.Color(0x4488ff); // Bleu
        } else if (type < 0.7) {
            color = new THREE.Color(0xaa44ff); // Violet
        } else {
            color = new THREE.Color(0xff6666); // Rouge
        }
        
        gasColors.push(color.r, color.g, color.b);
    }
    
    gasGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(gasPositions), 3));
    gasGeometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(gasColors), 3));
    
    const gasMaterial = new THREE.PointsMaterial({
        size: 150,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        sizeScale: window.devicePixelRatio
    });
    
    const gasPoints = new THREE.Points(gasGeometry, gasMaterial);
    galaxyScene.add(gasPoints);
}

function animateMilkyWay() {
    requestAnimationFrame(animateMilkyWay);

    const time = Date.now() * 0.0001;

    // Rotation réaliste très lente de la galaxie
    if (galaxyStars) {
        galaxyStars.rotation.z += 0.00001;
    }
    
    // Rotation du disque d'accrétion
    if (galaxyCenter) {
        galaxyCenter.rotation.z += 0.0008;
    }

    // Animation du halo
    for (let child of galaxyScene.children) {
        if (child.geometry && child.geometry.type === 'IcosahedronGeometry') {
            child.rotation.x += 0.0002;
            child.rotation.y += 0.0003;
            child.scale.x = 0.95 + Math.sin(time * 0.3) * 0.05;
            child.scale.y = 0.95 + Math.sin(time * 0.3) * 0.05;
            child.scale.z = 0.95 + Math.sin(time * 0.3) * 0.05;
        }
    }

    galaxyRenderer.render(galaxyScene, galaxyCamera);
}

function addSun() {
    const sunDistance = 26000;
    const sunGeometry = new THREE.SphereGeometry(500, 32, 32);
    const sunMaterial = new THREE.MeshPhongMaterial({
        color: 0xffff00,
        emissive: 0xffff00,
        emissiveIntensity: 2.5
    });

    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(sunDistance, 0, 0);
    galaxyScene.add(sun);

    // Halo du Soleil
    const glowGeometry = new THREE.SphereGeometry(2000, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        transparent: true,
        opacity: 0.6
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.copy(sun.position);
    galaxyScene.add(glow);
}

function addGalaxyControls() {
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const container = document.getElementById('galaxyContainer3d');

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        galaxyScene.rotation.y += deltaX * 0.005;
        galaxyScene.rotation.x += deltaY * 0.005;

        previousMousePosition = { x: e.clientX, y: e.clientY };
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const zoomSpeed = 1000;
        if (e.deltaY > 0) {
            galaxyCamera.position.multiplyScalar(1.1);
        } else {
            galaxyCamera.position.multiplyScalar(0.9);
        }
    });
}

function onWindowResizeGalaxy() {
    const container = document.getElementById('galaxyContainer3d');
    if (!container || !galaxyRenderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    galaxyCamera.aspect = width / height;
    galaxyCamera.updateProjectionMatrix();
    galaxyRenderer.setSize(width, height);
}

function showGalaxyHistory() {
    const modal = document.getElementById('galaxyHistoryModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeGalaxyHistory() {
    const modal = document.getElementById('galaxyHistoryModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Initialiser quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMilkyWay3D, 500);
});

// Fermer la modal en cliquant en dehors
document.addEventListener('click', (e) => {
    const modal = document.getElementById('galaxyHistoryModal');
    if (modal && e.target === modal) {
        closeGalaxyHistory();
    }
});
