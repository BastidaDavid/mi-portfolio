import * as THREE from 'three'; const scene = new THREE.Scene();
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

// Array de cubos de diferentes colores
const cubes = [];
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
colors.forEach(color => {
  const geometry = new THREE.BoxGeometry(1,1,1);
  const material = new THREE.MeshStandardMaterial({color});
  const cube = new THREE.Mesh(geometry, material);
  cube.visible = false;
  scene.add(cube);
  cubes.push(cube);
});

let currentIndex = 0;
cubes[currentIndex].visible = true; // mostrar el primero

// Funciones para cambiar cubo
function showCube(index){
  cubes.forEach(c => c.visible = false);
  cubes[index].visible = true;
  currentIndex = index;
}

// Botones
document.getElementById('next').addEventListener('click', ()=>{
  let nextIndex = (currentIndex + 1) % cubes.length;
  showCube(nextIndex);
});

document.getElementById('prev').addEventListener('click', ()=>{
  let prevIndex = (currentIndex - 1 + cubes.length) % cubes.length;
  showCube(prevIndex);
});

// Animación
function animate(){
  requestAnimationFrame(animate);
  cubes.forEach(cube => {
    if(cube.visible){
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
    }
  });
  renderer.render(scene,camera);
}
animate();

// Ajuste de ventana
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});