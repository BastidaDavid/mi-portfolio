// 1. Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// 2. Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xeeeeee); // fondo gris claro
document.body.appendChild(renderer.domElement);

// 3. Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// 4. Cargar modelo .glb
const loader = new THREE.GLTFLoader();
const url = '3d/cube.glb'; // Ruta relativa desde index.html

let cube;
loader.load(
  url,
  (gltf) => {
    cube = gltf.scene;
    cube.scale.set(0.5, 0.5, 0.5); // Ajusta la escala si es necesario
    cube.position.set(0, 0, 0); // Centrar modelo
    scene.add(cube);
    console.log('Modelo cargado:', cube);
    
  },
  undefined,
  (error) => {
    console.error('Error al cargar el modelo GLB:', error);
  }
);

// 5. Animación
function animate() {
  requestAnimationFrame(animate);

  if(cube){
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}
animate();

// 6. Ajuste de ventana
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});