import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.152.2/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'https://unpkg.com/three@0.152.2/examples/jsm/renderers/CSS2DRenderer.js';

const container = document.getElementById('app');
const infoEl = document.getElementById('info');
const autoRotateEl = document.getElementById('autoRotate');
const showLabelsEl = document.getElementById('showLabels');
const speedEl = document.getElementById('speed');
const resetBtn = document.getElementById('reset');

let scene, camera, renderer, labelRenderer, controls, raycaster;
let planets = [];
let clock = new THREE.Clock();
let animSpeed = parseFloat(speedEl.value) || 1;

const PLANETS = [
  { name: 'Soleil', size: 50, distance: 0, color: 0xffdd66, isSun: true },
  { name: 'Mercure', size: 3.8, distance: 80, color: 0x8c7853, speed: 0.04 },
  { name: 'Vénus', size: 9.5, distance: 120, color: 0xffc649, speed: 0.015 },
  { name: 'Terre', size: 10, distance: 170, color: 0x4da6ff, speed: 0.01 },
  { name: 'Mars', size: 5.3, distance: 220, color: 0xe27b58, speed: 0.008 },
  { name: 'Jupiter', size: 35, distance: 360, color: 0xdaa520, speed: 0.002 },
  { name: 'Saturne', size: 30, distance: 520, color: 0xf4a460, speed: 0.0012, rings: true }
];

function init(){
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000814);

  camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 10000);
  camera.position.set(400,200,600);

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  container.appendChild(renderer.domElement);

  // label renderer (DOM labels)
  labelRenderer = new CSS2DRenderer();
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.domElement.style.position = 'absolute';
  labelRenderer.domElement.style.top = '0px';
  labelRenderer.domElement.style.pointerEvents = 'none';
  container.appendChild(labelRenderer.domElement);

  // controls
  controls = new OrbitControls(camera, labelRenderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = autoRotateEl.checked;
  controls.autoRotateSpeed = 0.8;

  // lights
  const amb = new THREE.AmbientLight(0xffffff, 0.35);
  scene.add(amb);
  const sunLight = new THREE.PointLight(0xffffff, 1.6, 0);
  sunLight.position.set(0,0,0);
  scene.add(sunLight);

  // raycaster for hover/click
  raycaster = new THREE.Raycaster();

  // create planetary system group
  const system = new THREE.Group();
  scene.add(system);

  PLANETS.forEach(p => {
    const geom = new THREE.SphereGeometry(p.size, 32, 32);
    const mat = p.isSun ? new THREE.MeshBasicMaterial({ color: p.color }) : new THREE.MeshStandardMaterial({ color: p.color, roughness: 0.7 });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (p.distance === 0) {
      mesh.position.set(0,0,0);
    } else {
      mesh.position.set(p.distance, 0, 0);
    }

    // create pivot for orbit
    const pivot = new THREE.Object3D();
    pivot.userData = { speed: p.speed || 0 };
    pivot.add(mesh);
    pivot.userData.planet = p;
    pivot.userData.mesh = mesh;
    system.add(pivot);

    // label DOM
    const div = document.createElement('div');
    div.className = 'labelSprite';
    div.textContent = p.name;
    div.style.display = showLabelsEl.checked ? 'block' : 'none';
    const label = new CSS2DObject(div);
    label.position.set(0, p.size + 8, 0);
    mesh.add(label);

    planets.push({ pivot, mesh, labelElement: div, def: p, angle: Math.random()*Math.PI*2 });

    // optional rings (simple)
    if (p.rings){
      const ringGeo = new THREE.RingGeometry(p.size+4, p.size+10, 64);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xccccaa, side: THREE.DoubleSide, transparent:true, opacity:0.7 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI/2;
      mesh.add(ring);
    }
  });

  window.addEventListener('resize', onResize);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('click', onClick);

  // UI
  autoRotateEl.addEventListener('change', ()=> controls.autoRotate = autoRotateEl.checked);
  showLabelsEl.addEventListener('change', ()=>{
    planets.forEach(p=> p.labelElement.style.display = showLabelsEl.checked ? 'block' : 'none');
  });
  speedEl.addEventListener('input', ()=> animSpeed = parseFloat(speedEl.value));
  resetBtn.addEventListener('click', ()=>{
    camera.position.set(400,200,600);
    controls.target.set(0,0,0);
    controls.update();
  });

  animate();
}

function onResize(){
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  labelRenderer.setSize(window.innerWidth, window.innerHeight);
}

let mouse = new THREE.Vector2();
function onMove(e){
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
}

function onClick(){
  raycaster.setFromCamera(mouse, camera);
  const objs = planets.map(p=>p.mesh);
  const hits = raycaster.intersectObjects(objs, true);
  if (hits.length>0){
    const target = hits[0].object;
    // focus: simple smooth (tween-free)
    const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
    controls.target.copy(target.getWorldPosition(new THREE.Vector3()));
    camera.position.copy(controls.target).add(dir);
    controls.update();
  }
}

function animate(){
  requestAnimationFrame(animate);
  const dt = clock.getDelta();

  // update orbits
  planets.forEach(p=>{
    if (p.def.distance === 0) return; // sun
    p.angle += (p.def.speed || 0.01) * dt * 60 * animSpeed;
    const x = Math.cos(p.angle) * p.def.distance;
    const z = Math.sin(p.angle) * p.def.distance;
    p.mesh.position.set(x, 0, z);
  });

  // hover detection
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(planets.map(p=>p.mesh));
  if (hits.length>0){
    const m = hits[0].object;
    infoEl.textContent = `🔭 ${m.parent?.userData?.planet?.name || m.userData?.name || 'Objet'} — distance ${Math.round(m.position.length())}`;
  } else {
    infoEl.textContent = 'Prêt — survolez une planète';
  }

  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

init();
