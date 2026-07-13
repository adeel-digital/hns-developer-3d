// ==========================================
// 1. HIGH-PERFORMANCE 3D ENGINE (Optimized)
// ==========================================
const container = document.getElementById('canvas-wrapper');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1000;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0xff3333, transparent: true, opacity: 0.3 });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    particlesMesh.rotation.y -= 0.0005; 
    renderer.render(scene, camera);
}
animateCanvas();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// 2. HERO IMAGE CAROUSEL
// ==========================================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 5000);

// ==========================================
// 3. SCROLL REVEAL & SVG CIRCLE ANIMATION
// ==========================================
function revealElements() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveal.classList.add("active");
            
            // Trigger SVG Circle Animation if it's the milestones section
            if(reveal.classList.contains('circles-container')) {
                animateCircles();
            }
        }
    });
}
window.addEventListener("scroll", revealElements);
revealElements();

let circlesAnimated = false;
function animateCircles() {
    if(circlesAnimated) return;
    const circles = document.querySelectorAll('.svg-circle');
    
    circles.forEach(circle => {
        const percent = circle.getAttribute('data-percent');
        const progressCircle = circle.querySelector('.progress');
        const textElement = circle.querySelector('.circle-text');
        
        // 314 is the circumference of r=50 (2 * pi * 50)
        const offset = 314 - (314 * percent) / 100;
        progressCircle.style.strokeDashoffset = offset;

        // Number counter logic for circles
        let count = 0;
        const speed = 20; 
        const interval = setInterval(() => {
            if(count >= percent) {
                clearInterval(interval);
            } else {
                count++;
                textElement.innerText = count + '%';
            }
        }, speed);
    });
    circlesAnimated = true;
}

// ==========================================
// 4. $500 ADVANCED ESTIMATOR ALGORITHM
// ==========================================
const areaSlider = document.getElementById('area-slider');
const areaValDisplay = document.getElementById('area-val');
const tierSelect = document.getElementById('tier-select');
const addons = document.querySelectorAll('.custom-checkbox input');

const recBase = document.getElementById('rec-base');
const recAddons = document.getElementById('rec-addons');
const recTotal = document.getElementById('rec-total');

function calculateQuote() {
    const area = parseFloat(areaSlider.value);
    const rate = parseFloat(tierSelect.value);
    
    // Calculate Base
    const baseCost = area * rate;
    
    // Calculate Addons
    let addonCost = 0;
    addons.forEach(box => {
        if(box.checked) addonCost += parseFloat(box.value);
    });

    const totalCost = baseCost + addonCost;

    // Update UI Elements
    areaValDisplay.innerText = area;
    recBase.innerText = 'Rs. ' + baseCost.toLocaleString('en-PK');
    recAddons.innerText = 'Rs. ' + addonCost.toLocaleString('en-PK');
    recTotal.innerText = 'Rs. ' + totalCost.toLocaleString('en-PK');
}

// Event Listeners for real-time calculation
areaSlider.addEventListener('input', calculateQuote);
tierSelect.addEventListener('change', calculateQuote);
addons.forEach(box => box.addEventListener('change', calculateQuote));

// Initial Calculation on Load
calculateQuote();

// Formal Quote Button
document.getElementById('calc-btn').addEventListener('click', () => {
    const finalAmt = document.getElementById('rec-total').innerText;
    alert(`Formal Quote Generated for ${finalAmt}. Integration with Adbismarketinghub CRM pending.`);
});
