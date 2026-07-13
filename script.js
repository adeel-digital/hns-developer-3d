// ==========================================
// 1. THREE.JS BACKGROUND (High-Status Particles & Abstract Flow)
// ==========================================
const container = document.getElementById('canvas-wrapper');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
container.appendChild(renderer.domElement);

// Creating a massive subtle particle grid for premium tech feel
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);
for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 25; // Wide spread
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({ size: 0.02, color: 0xff3333, transparent: true, opacity: 0.4 });
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation Loop for Canvas
function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    particlesMesh.rotation.y -= 0.0005; 
    particlesMesh.rotation.x += 0.0002;
    renderer.render(scene, camera);
}
animateCanvas();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// 2. HERO IMAGE CAROUSEL LOGIC
// ==========================================
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}
// Change image every 5 seconds
setInterval(nextSlide, 5000);

// ==========================================
// 3. SCROLL REVEAL (Smooth Fade Ups)
// ==========================================
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
reveal();

// ==========================================
// 4. ANIMATED STATS COUNTER
// ==========================================
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

window.addEventListener('scroll', () => {
    const section = document.querySelector('.stats-section');
    if(!section) return;
    const sectionPos = section.getBoundingClientRect().top;
    
    if (sectionPos < window.innerHeight && !hasCounted) {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 100; // Faster count
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
        hasCounted = true;
    }
});

// ==========================================
// 5. ESTIMATOR ALGORITHM
// ==========================================
document.getElementById('calculate-btn').addEventListener('click', () => {
    const areaInput = document.getElementById('area-input').value;
    const rateInput = document.getElementById('type-input').value;
    const paintAddon = document.getElementById('feature-paint').checked ? parseFloat(document.getElementById('feature-paint').value) : 0;
    const fallAddon = document.getElementById('feature-fall').checked ? parseFloat(document.getElementById('feature-fall').value) : 0;
    
    const resultBox = document.getElementById('result-box');
    const totalCostDisplay = document.getElementById('total-cost');
    
    if (areaInput && areaInput > 0) {
        const baseCost = parseFloat(areaInput) * parseFloat(rateInput);
        const totalCost = baseCost + paintAddon + fallAddon;
        
        totalCostDisplay.innerText = 'Rs. ' + totalCost.toLocaleString('en-PK');
        resultBox.style.display = 'block';
    } else {
        alert('Invalid Request: Please input covered area in Sq. Ft.');
    }
});

// ==========================================
// 6. FORM SUBMISSION INTERCEPT
// ==========================================
document.getElementById('lead-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Request Secured. System will forward parameters to your Adbismarketinghub CRM.');
});
