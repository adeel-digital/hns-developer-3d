/**
 * H&S Developer - Enterprise Frontend Architecture
 * Developed by: Adbismarketinghub
 * Standard: ES6+ Class Based Modules
 */

class WebGLEngine {
    constructor() {
        this.container = document.getElementById('webgl-container');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        this.init();
    }

    init() {
        this.camera.position.z = 8;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);
        this.buildAbstractCore();
        this.bindEvents();
        this.animate();
    }

    buildAbstractCore() {
        // High-Density Particle Grid
        const pGeo = new THREE.BufferGeometry();
        const pCount = 2000;
        const pPos = new Float32Array(pCount * 3);
        for(let i = 0; i < pCount * 3; i++) pPos[i] = (Math.random() - 0.5) * 30;
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
        
        const pMat = new THREE.PointsMaterial({ 
            size: 0.03, color: 0xff3333, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending 
        });
        this.particles = new THREE.Points(pGeo, pMat);
        this.scene.add(this.particles);

        // Advanced Wireframe Construct
        this.constructGroup = new THREE.Group();
        
        // Outer Geometry
        const outerBox = new THREE.BoxGeometry(4, 4, 4);
        const outerWire = new THREE.LineSegments(new THREE.EdgesGeometry(outerBox), new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 }));
        
        // Inner Core (Complex)
        const innerShape = new THREE.IcosahedronGeometry(2, 2);
        const innerMesh = new THREE.Mesh(innerShape, new THREE.MeshBasicMaterial({ color: 0xdc2626, wireframe: true, transparent: true, opacity: 0.8 }));
        
        this.constructGroup.add(outerWire, innerMesh);
        
        // Placement based on device
        this.updateConstructPosition();
        this.scene.add(this.constructGroup);
    }

    updateConstructPosition() {
        if(window.innerWidth < 992) this.constructGroup.position.set(0, 3, -4);
        else this.constructGroup.position.set(4, 0, -2);
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.updateConstructPosition();
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.particles.rotation.y -= 0.0005;
        this.constructGroup.rotation.x += 0.001;
        this.constructGroup.rotation.y += 0.003;
        this.constructGroup.children[1].rotation.z -= 0.002;
        this.renderer.render(this.scene, this.camera);
    }
}

class UIManager {
    constructor() {
        this.initMobileMenu();
        this.initScrollReveal();
        this.initMetricsObserver();
        this.initPortfolioFilter();
        this.initEstimator();
    }

    initMobileMenu() {
        const toggle = document.getElementById('mobile-toggle');
        const menu = document.getElementById('nav-menu');
        const links = document.querySelectorAll('.nav-link');

        toggle.addEventListener('click', () => {
            toggle.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('is-active');
                menu.classList.remove('is-active');
            });
        });
    }

    initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }

    initMetricsObserver() {
        let animated = false;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                this.animateSVGProgress();
                animated = true;
            }
        });
        const metricsSection = document.getElementById('metrics');
        if(metricsSection) observer.observe(metricsSection);
    }

    animateSVGProgress() {
        const rings = document.querySelectorAll('.svg-progress');
        rings.forEach(ring => {
            const target = parseInt(ring.getAttribute('data-target'));
            const circle = ring.querySelector('.bar');
            const counter = ring.querySelector('.counter');
            
            // Calc offset based on 314 standard circumference
            const offset = 314 - (314 * target) / 100;
            setTimeout(() => circle.style.strokeDashoffset = offset, 200);

            // Number Counter
            let current = 0;
            const timer = setInterval(() => {
                if(current >= target) clearInterval(timer);
                else { current++; counter.innerText = current; }
            }, 25);
        });
    }

    initPortfolioFilter() {
        const buttons = document.querySelectorAll('.filter-btn');
        const items = document.querySelectorAll('.portfolio-item');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Active state toggle
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Filter logic
                const filter = btn.getAttribute('data-filter');
                items.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 50);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }

    initEstimator() {
        const areaSlider = document.getElementById('area-slider');
        const areaDisp = document.getElementById('area-display');
        const tierSel = document.getElementById('tier-select');
        const addons = document.querySelectorAll('.custom-cb input');
        
        const uiBase = document.getElementById('base-cost');
        const uiAddon = document.getElementById('addon-cost');
        const uiTotal = document.getElementById('total-cost');

        const calculate = () => {
            const area = parseFloat(areaSlider.value);
            const rate = parseFloat(tierSel.value);
            
            let addonTotal = 0;
            addons.forEach(cb => { if(cb.checked) addonTotal += parseFloat(cb.getAttribute('data-cost')); });

            const baseTotal = area * rate;
            const finalTotal = baseTotal + addonTotal;

            // DOM Updates
            areaDisp.innerText = area;
            uiBase.innerText = 'Rs. ' + baseTotal.toLocaleString('en-PK');
            uiAddon.innerText = 'Rs. ' + addonTotal.toLocaleString('en-PK');
            uiTotal.innerText = 'Rs. ' + finalTotal.toLocaleString('en-PK');
        };

        // Event Binding
        areaSlider.addEventListener('input', calculate);
        tierSel.addEventListener('change', calculate);
        addons.forEach(cb => cb.addEventListener('change', calculate));
        
        // Initial Fire
        calculate();
    }
}

// Initialize Application Engine on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const webgl = new WebGLEngine();
    const ui = new UIManager();
});
