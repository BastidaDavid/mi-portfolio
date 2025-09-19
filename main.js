import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(5,5,5);
scene.add(directionalLight);

const loader = new GLTFLoader();

// Array con tus modelos GLB
const models = [
  '3d/cube_red.glb',
  '3d/cube_green.glb',
  '3d/cube_blue.glb',
  '3d/cube_yellow.glb'
];

let currentIndex = 0;
let currentModel;

// Función para cargar un GLB
function loadModel(index){
    // Quitar modelo anterior
    if(currentModel){
        scene.remove(currentModel);
    }

    loader.load(models[index], (gltf)=>{
        currentModel = gltf.scene;
        currentModel.scale.set(1,1,1);
        scene.add(currentModel);
    }, undefined, (error)=>{
        console.error(error);
    });

    currentIndex = index;
}

// Inicializamos con el primer modelo
loadModel(currentIndex);

// Botones
document.getElementById('next').addEventListener('click', ()=>{
    let nextIndex = (currentIndex + 1) % models.length;
    loadModel(nextIndex);
});

document.getElementById('prev').addEventListener('click', ()=>{
    let prevIndex = (currentIndex - 1 + models.length) % models.length;
    loadModel(prevIndex);
});

// Animación
function animate(){
    requestAnimationFrame(animate);
    if(currentModel){
        currentModel.rotation.x += 0.01;
        currentModel.rotation.y += 0.01;
    }
    renderer.render(scene,camera);
}
animate();

// Ajuste de ventana
window.addEventListener('resize', ()=>{
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

const infoBox = document.getElementById('infoBox');
const infoText = document.getElementById('infoText');

// Array de descripciones de tus modelos
const modelInfo = [
  "Cubo rojo: Este modelo representa el primer diseño.",
  "Cubo verde: Este modelo es la versión ecológica.",
  "Cubo azul: Modelo con acabado metálico.",
  "Cubo amarillo: Versión destacada para exposición."
];

// Botón detalles
document.getElementById('details').addEventListener('click', ()=>{
  if(infoBox.style.display === "none"){
    infoText.textContent = modelInfo[currentIndex]; // actualiza según modelo
    infoBox.style.display = "block";
  } else {
    infoBox.style.display = "none";
  }
});