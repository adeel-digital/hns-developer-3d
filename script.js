// =========================================================
// H&S DEVELOPER - ADVANCED INTERACTIVE ENGINE
// =========================================================

class Interactive3DEngine {
    constructor() {
        this.container = document.getElementById('webgl-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        // Mouse Tracking variables
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }

    init() {
        this.camera.position.z = 8;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        
        this.buildComplexGeometry();
        this.bindEvents();
        this.animate();
    }

    buildComplexGeometry() {
        // 1. Background Particles
        const pGeo = new THREE.BufferGeometry();
        const pCount = 1000;
        const pPos = new Float32Array(pCount * 3);
        for(let i = 0; i < pCount * 3; i++) {
            pPos[i] = (Math.random() - 0.5) * 25;
        }
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        const pMat = new THREE.PointsMaterial({ size: 0.04, color: 0xe63946, transparent: true, opacity: 0.5 });
        this.particles = new THREE.Points(pGeo, pMat);
        this.scene.add(this.particles);

        // 2. Complex Interactive Shape (TorusKnot inside Wireframe Sphere)
        this.shapeGroup = new THREE.Group();
        
        // Inner Core: Torus Knot
        const innerGeo = new THREE.TorusKnotGeometry(1.2, 0.4, 100, 16);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0xe63946, wireframe: true, transparent: true, opacity: 0.8 });
        this.innerShape = new THREE.Mesh(innerGeo, innerMat);
        
        // Outer Shell: Icosahedron Wireframe
        const outerGeo = new THREE.IcosahedronGeometry(2.5, 2);
        const outerMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.4 });
        this.outerShape = new THREE.LineSegments(new THREE.EdgesGeometry(outerGeo), outerMat);
        
        this.shapeGroup.add(this.innerShape);
        this.shapeGroup.add(this.outerShape);
        
        // Position it to the right on desktop, center on mobile
        this.updatePosition();
        this.scene.add(this.shapeGroup);
    }

    updatePosition() {
        if(window.innerWidth < 992) {
            this.shapeGroup.position.set(0, 3, -4);
        } else {
            this.shapeGroup.position.set(4, 0, -2);
        }
    }

    bindEvents() {
        // Window Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.updatePosition();
        });

        // Mouse Move Interaction
        document.addEventListener('mousemove', (event) => {
            this.mouseX = (event.clientX - window.innerWidth / 2);
            this.mouseY = (event.clientY - window.innerHeight / 2);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Default Rotation
        this.particles.rotation.y -= 0.0005;
        this.innerShape.rotation.x += 0.005;
        this.innerShape.rotation.y += 0.005;
        this.outerShape.rotation.y -= 0.002;
        this.outerShape.rotation.z -= 0.001;

        // Interactive Mouse Movement (Smooth Damping)
        this.targetX = this.mouseX * 0.001;
        this.targetY = this.mouseY * 0.001;
        
        this.shapeGroup.rotation.x += 0.05 * (this.targetY - this.shapeGroup.rotation.x);
        this.shapeGroup.rotation.y += 0.05 * (this.targetX - this.shapeGroup.rotation.y);

        this.renderer.render(this.scene, this.camera);
    }
}

// =========================================================
// UI CONTROLLER LOGIC
// =========================================================

class UIManager {
    constructor() {
        this.initMenu();
        this.initSlider();
        this.initScrollReveal();
        this.initEstimator();
    }

    initMenu() {
        const toggle = document.getElementById('mobile-toggle');
        const menu = document.getElementById('nav-menu');
        const links = document.querySelectorAll('.nav-link');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-active');
            menu.classList.toggle('is-active');
            document.body.style.overflow = menu.classList.contains('is-active') ? 'hidden' : ''; // Prevent body scroll when menu open
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('is-active');
                menu.classList.remove('is-active');
                document.body.style.overflow = '';
            });
        });
    }

    initSlider() {
        const slides = document.querySelectorAll('.hero__slide');
        let current = 0;
        setInterval(() => {
            slides[current].classList.remove('is-active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('is-active');
        }, 5000);
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Check if it's the metrics section to animate SVG
                    if(entry.target.classList.contains('metrics__grid')) {
                        this.animateRings();
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }

    animateRings() {
        const rings = document.querySelectorAll('.svg-progress');
        rings.forEach(ring => {
            const target = parseInt(ring.getAttribute('data-target'));
            const bar = ring.querySelector('.bar');
            const counter = ring.querySelector('.counter');
            
            const offset = 314 - (314 * target) / 100;
            setTimeout(() => { bar.style.strokeDashoffset = offset; }, 100);

            let count = 0;
            const timer = setInterval(() => {
                if(count >= target) clearInterval(timer);
                else { count++; counter.innerText = count; }
            }, 20);
        });
    }

    initEstimator() {
        const slider = document.getElementById('area-slider');
        const display = document.getElementById('area-display');
        const tier = document.getElementById('tier-select');
        const checkboxes = document.querySelectorAll('.custom-cb input');
        
        const uiBase = document.getElementById('base-cost');
        const uiAddon = document.getElementById('addon-cost');
        const uiTotal = document.getElementById('total-cost');

        const calculate = () => {
            const area = parseFloat(slider.value);
            const rate = parseFloat(tier.value);
            
            let addonCost = 0;
            checkboxes.forEach(cb => {
                if(cb.checked) addonCost += parseFloat(cb.getAttribute('data-cost'));
            });

            const baseCost = area * rate;
            const totalCost = baseCost + addonCost;

            display.innerText = area;
            uiBase.innerText = 'Rs. ' + baseCost.toLocaleString('en-PK');
            uiAddon.innerText = 'Rs. ' + addonCost.toLocaleString('en-PK');
            uiTotal.innerText = 'Rs. ' + totalCost.toLocaleString('en-PK');
        };

        slider.addEventListener('input', calculate);
        tier.addEventListener('change', calculate);
        checkboxes.forEach(cb => cb.addEventListener('change', calculate));
        
        calculate(); // Run once on load
    }
}

// Boot up systems
document.addEventListener('DOMContentLoaded', () => {
    new Interactive3DEngine();
    new UIManager();
});
