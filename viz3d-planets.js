(() => {
	const container = document.getElementById('sceneContainer');
	const infoEl = document.getElementById('selectedPlanetInfo');

	const scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0x000000, 0.0007);

	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio || 1);
	renderer.setSize(container.clientWidth, container.clientHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	container.appendChild(renderer.domElement);

	const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 10000);
	camera.position.set(-200, 120, 400);

	const controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.maxDistance = 4000;

	const ambient = new THREE.AmbientLight(0x222233, 0.6);
	scene.add(ambient);

	const sunLight = new THREE.PointLight(0xffffff, 2.5, 0, 2);
	sunLight.position.set(0, 0, 0);
	scene.add(sunLight);

	const loader = new THREE.TextureLoader();

	const planetsInfo = [
		{ name: 'Soleil', radius: 25, distance: 0, color: 0xffdd66, emissive: 0xffaa33, info: '<strong>Soleil</strong><br>Étoile principale du système solaire' },
		{ name: 'Mercure', radius: 2.4, distance: 40, color: 0x9b8b7a, texture: 'https://threejs.org/examples/textures/planets/mercury.jpg', orbitSpeed: 0.02, info: 'Mercure — petite planète rocheuse' },
		{ name: 'Vénus', radius: 6, distance: 60, color: 0xe0b07a, texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/1024px-Venus-real_color.jpg', orbitSpeed: 0.015, info: 'Vénus — atmosphère dense, effet de serre' },
		{ name: 'Terre', radius: 6.4, distance: 85, color: 0x2266cc, texture: 'https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg', orbitSpeed: 0.01, info: 'Terre — planète habitable' },
		{ name: 'Mars', radius: 3.4, distance: 105, color: 0xcc6a45, texture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/1024px-OSIRIS_Mars_true_color.jpg', orbitSpeed: 0.008, info: 'Mars — planète rouge' },
		{ name: 'Jupiter', radius: 14, distance: 150, color: 0xd9a15a, texture: 'https://threejs.org/examples/textures/planets/jupiter.jpg', orbitSpeed: 0.005, info: 'Jupiter — géante gazeuse' },
		{ name: 'Saturne', radius: 12, distance: 195, color: 0xe6d0a3, texture: 'https://threejs.org/examples/textures/planets/saturn.jpg', orbitSpeed: 0.004, info: 'Saturne — célèbre pour ses anneaux' },
		{ name: 'Uranus', radius: 8, distance: 240, color: 0x7fd6e6, texture: 'https://threejs.org/examples/textures/planets/uranus.jpg', orbitSpeed: 0.003, info: 'Uranus — géante de glace' },
		{ name: 'Neptune', radius: 7.8, distance: 280, color: 0x3b66ff, texture: 'https://threejs.org/examples/textures/planets/neptune.jpg', orbitSpeed: 0.0025, info: 'Neptune — vents très violents' }
	];

	const bodies = [];

	planetsInfo.forEach((p, idx) => {
		const group = new THREE.Group();
		group.name = p.name + '_orbit';
		scene.add(group);

		const geom = new THREE.SphereGeometry(p.radius, 32, 32);
		let mat;
		if (p.texture) {
			const tex = loader.load(p.texture, undefined, undefined, () => {});
			tex.encoding = THREE.sRGBEncoding;
			mat = new THREE.MeshStandardMaterial({ map: tex });
		} else {
			mat = new THREE.MeshStandardMaterial({ color: p.color || 0x888888 });
		}

		if (p.emissive) {
			mat.emissive = new THREE.Color(p.emissive);
			mat.emissiveIntensity = 0.9;
		}

		const mesh = new THREE.Mesh(geom, mat);
		mesh.userData = p;
		mesh.position.x = p.distance;
		group.add(mesh);

		if (p.name === 'Saturne') {
			const ringGeom = new THREE.RingGeometry(p.radius + 2, p.radius + 6, 64);
			const ringMat = new THREE.MeshBasicMaterial({ color: 0xd6c99a, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
			const ring = new THREE.Mesh(ringGeom, ringMat);
			ring.rotation.x = -0.5 * Math.PI / 2.5;
			ring.position.set(p.distance, 0, 0);
			scene.add(ring);
		}

		if (p.name === 'Soleil') {
			mesh.scale.set(1.6, 1.6, 1.6);
			const sunMat = new THREE.MeshBasicMaterial({ color: p.color, emissive: p.emissive });
			mesh.material = sunMat;
			const bulb = new THREE.PointLight(0xffeecc, 2.5, 0, 2);
			bulb.position.set(0, 0, 0);
			scene.add(bulb);
		}

		bodies.push({ group, mesh, data: p });
	});

	const starGeo = new THREE.BufferGeometry();
	const starCount = 2000;
	const positions = new Float32Array(starCount * 3);
	for (let i = 0; i < starCount; i++) {
		positions[i * 3] = (Math.random() - 0.5) * 2000;
		positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
		positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
	}
	starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
	const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 }));
	scene.add(stars);

	// Add Milky Way / sky dome as a large inverted sphere
	const milkyWayUrl = 'https://threejs.org/examples/textures/galaxy_starfield.png';
	loader.load(milkyWayUrl, (tex) => {
		tex.encoding = THREE.sRGBEncoding;
		const skyGeo = new THREE.SphereGeometry(1500, 60, 40);
		const skyMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.BackSide });
		const sky = new THREE.Mesh(skyGeo, skyMat);
		scene.add(sky);
	});

	let last = performance.now();
	let running = true;
	let speedFactor = 1;

	const raycaster = new THREE.Raycaster();
	const mouse = new THREE.Vector2();

	function animate() {
		requestAnimationFrame(animate);

		const now = performance.now();
		const delta = (now - last) / 1000;
		last = now;

		bodies.forEach(b => {
			const s = b.data.orbitSpeed || 0;
			b.group.rotation.y += (s * 0.5) * delta * speedFactor;
			b.mesh.rotation.y += 0.2 * delta;
		});

		controls.update();
		renderer.render(scene, camera);
	}

	function onResize() {
		const w = container.clientWidth;
		const h = container.clientHeight;
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
		renderer.setSize(w, h);
	}

	window.addEventListener('resize', onResize);

	function pick(event) {
		const rect = renderer.domElement.getBoundingClientRect();
		mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
		mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);
		const meshes = bodies.map(b => b.mesh);
		const intersects = raycaster.intersectObjects(meshes);
		if (intersects.length > 0) {
			const m = intersects[0].object;
			const d = m.userData;
			selectPlanet(d);
		}
	}

	function selectPlanet(data) {
		infoEl.innerHTML = `<h2>${data.name}</h2><p>${data.info || 'Aucune information détaillée.'}</p>`;
	}

	renderer.domElement.addEventListener('pointerdown', pick);

	window.toggleAnimation = function () {
		running = !running;
		if (running) {
			last = performance.now();
			requestAnimationFrame(animate);
		}
	};

	window.changeSpeed = function () {
		if (speedFactor === 1) speedFactor = 0.5;
		else if (speedFactor === 0.5) speedFactor = 2;
		else speedFactor = 1;
	};

	selectPlanet(planetsInfo[3]);

	animate();
})();
