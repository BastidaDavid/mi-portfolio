// 1. Escena y cámara
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 3;

// 2. Renderizador
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,5,5);
scene.add(light);

// 4. Cargar modelo .glb desde GitHub Pages
let cube;
const loader = new THREE.GLTFLoader();

// Cambia 'Usuario' y 'Repo' a tu usuario/repositorio
const glbURL = 'https://raw.githubusercontent.com/BastidaDavid/mi-portfolio/main/3d/cube.glb';

loader.load(
  glbURL,
  (gltf) => {
    cube = gltf.scene;
    scene.add(cube);
    cube.rotation.x = 0;
    cube.rotation.y = 0;
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