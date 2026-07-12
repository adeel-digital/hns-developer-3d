// ==========================================
// 1. THREE.JS 3D ENGINE ARCHITECTURE
// ==========================================
const container = document.getElementById('canvas-wrapper');
const scene = new THREE.Scene();

// Camera System Setup
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 6;

// High-Performance WebGL Renderer
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimizes for Retina/High-Res displays
container.appendChild(renderer.domElement);

// Constructing the Abstract Architectural Element
// Using TorusKnot for a more complex, "engineered" visual representation
const geometry = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xdc2626, 
    wireframe: true,
    transparent: true,
    opacity: 0.85
});
const complexStructure = new THREE.Mesh(geometry, material);
scene.add(complexStructure);

// Animation Engine Loop
function animate() {
    requestAnimationFrame(animate);
    
    // Smooth, calculating rotations
    complexStructure.rotation.x += 0.003;
    complexStructure.rotation.y += 0.005;
    complexStructure.rotation.z += 0.002;
    
    renderer.render(scene, camera);
}
animate();

// Event Listener for Window Resizing (Responsiveness)
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});


// ==========================================
// 2. DYNAMIC COST ESTIMATION ALGORITHM
// ==========================================
document.getElementById('calculate-btn').addEventListener('click', () => {
    const areaInput = document.getElementById('area-input').value;
    const rateInput = document.getElementById('type-input').value;
    const resultBox = document.getElementById('result-box');
    const totalCostDisplay = document.getElementById('total-cost');
    
    // Core Logic Verification
    if (areaInput && areaInput > 0) {
        const totalCost = parseFloat(areaInput) * parseFloat(rateInput);
        
        // Formatting to PKRs standard comma separation
        const formattedCost = 'Rs. ' + totalCost.toLocaleString('en-PK');
        
        // UI Update
        totalCostDisplay.innerText = formattedCost;
        resultBox.style.display = 'block';
        
        // Smooth scroll to result
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
        alert('Data Error: Please input a valid numeric value for the Total Covered Area.');
    }
});
