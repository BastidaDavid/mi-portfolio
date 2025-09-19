import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// ---------- ESCENA Y CÁMARA ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// ---------- RENDERER ----------
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ---------- LUCES ----------
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);

// ---------- ORBITCONTROLS ----------
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;

// ---------- MODELOS ----------
const loader = new GLTFLoader();

const models = [
  '3d/cube_red.glb',
  '3d/cube_green.glb',
  '3d/cube_blue.glb',
  '3d/cube_yellow.glb'
];

const modelInfo = [
  "Cubo rojo: Este modelo representa el primer diseño.",
  "Cubo verde: Este modelo es la versión ecológica.",
  "Cubo azul: Modelo con acabado metálico.",
  "Cubo amarillo: Versión destacada para exposición."
];

let currentIndex = 0;
let currentModel;

// ---------- SOMBRA ----------
const textureLoader = new THREE.TextureLoader();
const shadowTexture = textureLoader.load('img/shadow.png');

const shadowMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true })
);
shadowMesh.rotation.x = -Math.PI / 2;
shadowMesh.position.y = -0.5;
scene.add(shadowMesh);

// ---------- CARGA DE MODELO ----------
function loadModel(index) {
    if(currentModel) scene.remove(currentModel);

    loader.load(models[index], (gltf)=>{
        currentModel = gltf.scene;
        currentModel.scale.set(1,1,1);
        scene.add(currentModel);

        // sombra sigue al modelo
        shadowMesh.position.x = currentModel.position.x;
        shadowMesh.position.z = currentModel.position.z;

        // actualizar indicador
        updateIndicator(index);
    }, undefined, (error)=> console.error(error));

    currentIndex = index;
}

// Inicializamos con el primer modelo
loadModel(currentIndex);

// ---------- BOTONES SIGUIENTE / ANTERIOR ----------
document.getElementById('next').addEventListener('click', ()=>{
    let nextIndex = (currentIndex + 1) % models.length;
    loadModel(nextIndex);
});

document.getElementById('prev').addEventListener('click', ()=>{
    let prevIndex = (currentIndex - 1 + models.length) % models.length;
    loadModel(prevIndex);
});

// ---------- BOTÓN DETALLES ----------
const infoBox = document.getElementById('infoBox');
const infoText = document.getElementById('infoText');

document.getElementById('details').addEventListener('click', ()=>{
  if(infoBox.style.display === "none"){
    infoText.textContent = modelInfo[currentIndex];
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});

// ---------- INDICADOR DE MODELO ----------
function updateIndicator(index) {
  const dots = document.querySelectorAll('.model-indicator .dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// ---------- ANIMACIÓN ----------
function animate(){
    requestAnimationFrame(animate);
    if(currentModel) currentModel.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();

// ---------- AJUSTE DE VENTANA ----------
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});