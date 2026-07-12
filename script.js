// Get the container where the 3D object will live
const container = document.getElementById('canvas-wrapper');

// 1. Setup Scene
const scene = new THREE.Scene();

// 2. Setup Camera
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

// 3. Setup Renderer (Transparent background)
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// 4. Create the 3D Object (High-Tech Red Wireframe)
const geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true });
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// 5. Animation Loop
function animate() {
    requestAnimationFrame(animate);
    // Rotating the object smoothly
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// 6. Make it Responsive
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
