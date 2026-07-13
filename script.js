// ============================================================
// PREMIUM 3D ENGINE
// ============================================================

class Interactive3DEngine {

    constructor() {

        this.container = document.getElementById("webgl-container");

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        this.clock = new THREE.Clock();

        this.mouse = {
            x: 0,
            y: 0
        };

        this.target = {
            x: 0,
            y: 0
        };

        this.floatingObjects = [];

        this.init();

    }

    init() {

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.setPixelRatio(
            Math.min(window.devicePixelRatio,2)
        );

        this.renderer.shadowMap.enabled = true;

        this.container.appendChild(
            this.renderer.domElement
        );

        this.camera.position.set(
            0,
            4,
            12
        );

        this.scene.background = null;

        this.createLights();

        this.createParticles();

        this.createConstructionShape();

        this.createFloatingBoxes();

        this.events();

        this.animate();

    }

    // ==========================================================
    // LIGHTS
    // ==========================================================

    createLights(){

        const ambient = new THREE.AmbientLight(
            0xffffff,
            1.5
        );

        this.scene.add(ambient);

        const sun = new THREE.DirectionalLight(
            0xffffff,
            2
        );

        sun.position.set(
            10,
            20,
            15
        );

        this.scene.add(sun);

        const red = new THREE.PointLight(
            0xe63946,
            35,
            60
        );

        red.position.set(
            -5,
            4,
            6
        );

        this.scene.add(red);

    }

    // ==========================================================
    // PARTICLES
    // ==========================================================

    createParticles(){

        const geometry = new THREE.BufferGeometry();

        const count = 5000;

        const vertices = [];

        for(let i=0;i<count;i++){

            vertices.push(
                (Math.random()-0.5)*80,
                Math.random()*35,
                (Math.random()-0.5)*80
            );

        }

        geometry.setAttribute(

            "position",

            new THREE.Float32BufferAttribute(

                vertices,

                3

            )

        );

        const material = new THREE.PointsMaterial({

            color:0xe63946,

            size:0.05,

            transparent:true,

            opacity:0.5

        });

        this.particles = new THREE.Points(

            geometry,

            material

        );

        this.scene.add(

            this.particles

        );

    }
    // ==========================================================
// CONSTRUCTION SHAPE
// ==========================================================

createConstructionShape(){

    this.mainGroup = new THREE.Group();

    // Building Core

    const coreMaterial = new THREE.MeshStandardMaterial({

        color:0x8d99ae,

        roughness:.6,

        metalness:.35

    });

    const glassMaterial = new THREE.MeshStandardMaterial({

        color:0x3ba4ff,

        emissive:0x3ba4ff,

        emissiveIntensity:.35,

        transparent:true,

        opacity:.75

    });

    for(let i=0;i<14;i++){

        const floor = new THREE.Mesh(

            new THREE.BoxGeometry(
                2.6,
                .28,
                2.6
            ),

            coreMaterial

        );

        floor.position.y=i*.42;

        floor.castShadow=true;

        floor.receiveShadow=true;

        this.mainGroup.add(floor);

        // Windows

        for(let j=-2;j<=2;j++){

            const win=new THREE.Mesh(

                new THREE.BoxGeometry(
                    .25,
                    .18,
                    .05
                ),

                glassMaterial

            );

            win.position.set(

                j*.45,

                i*.42,

                1.33

            );

            this.mainGroup.add(win);

        }

    }

    // Roof

    const roof=new THREE.Mesh(

        new THREE.ConeGeometry(
            1.6,
            .9,
            4
        ),

        new THREE.MeshStandardMaterial({

            color:0xe63946

        })

    );

    roof.rotation.y=Math.PI/4;

    roof.position.y=6;

    this.mainGroup.add(roof);

    // Construction Rings

    this.rings=[];

    for(let i=0;i<4;i++){

        const ring=new THREE.Mesh(

            new THREE.TorusGeometry(

                2.2+i*.45,

                .03,

                16,

                120

            ),

            new THREE.MeshBasicMaterial({

                color:0xe63946,

                transparent:true,

                opacity:.35

            })

        );

        ring.rotation.x=Math.PI/2;

        ring.position.y=2.5;

        this.mainGroup.add(ring);

        this.rings.push(ring);

    }

    this.mainGroup.position.set(4,-1,-2);

    this.scene.add(this.mainGroup);

}

// ==========================================================
// FLOATING CONCRETE BLOCKS
// ==========================================================

createFloatingBoxes(){

    const material=new THREE.MeshStandardMaterial({

        color:0x555555,

        roughness:.8

    });

    for(let i=0;i<35;i++){

        const cube=new THREE.Mesh(

            new THREE.BoxGeometry(

                Math.random()*.25+.15,

                Math.random()*.25+.15,

                Math.random()*.25+.15

            ),

            material

        );

        cube.position.set(

            (Math.random()-.5)*10,

            Math.random()*6,

            (Math.random()-.5)*8

        );

        cube.userData={

            speed:Math.random()*.015+.003,

            angle:Math.random()*Math.PI*2

        };

        this.scene.add(cube);

        this.floatingObjects.push(cube);

    }

}

// ==========================================================
// EVENTS
// ==========================================================

events(){

    window.addEventListener("resize",()=>{

        this.camera.aspect=

        window.innerWidth/

        window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    });

    window.addEventListener("mousemove",(e)=>{

        this.mouse.x=

        e.clientX-window.innerWidth/2;

        this.mouse.y=

        e.clientY-window.innerHeight/2;

    });

}

// ==========================================================
// ANIMATE OBJECTS
// ==========================================================

animateObjects(){

    const t=this.clock.getElapsedTime();

    this.mainGroup.rotation.y+=0.003;

    this.mainGroup.position.y=

    Math.sin(t)*0.15;

    this.rings.forEach((ring,index)=>{

        ring.rotation.z+=0.004+(index*.002);

        ring.rotation.x+=0.002;

        ring.scale.setScalar(

            1+

            Math.sin(t+index)*0.02

        );

    });

    this.floatingObjects.forEach(box=>{

        box.userData.angle+=box.userData.speed;

        box.position.y+=Math.sin(box.userData.angle)*0.01;

        box.rotation.x+=0.01;

        box.rotation.y+=0.01;

    });

    this.particles.rotation.y+=0.0006;

}
    // ==========================================================
// PROCEDURAL TOWER CRANE
// ==========================================================

createCrane(){

    this.crane=new THREE.Group();

    const yellow=new THREE.MeshStandardMaterial({

        color:0xffd000,

        roughness:.45,

        metalness:.55

    });

    // Tower

    const tower=new THREE.Mesh(

        new THREE.BoxGeometry(.35,6,.35),

        yellow

    );

    tower.position.y=3;

    tower.castShadow=true;

    this.crane.add(tower);

    // Horizontal Arm

    const arm=new THREE.Mesh(

        new THREE.BoxGeometry(5,.18,.18),

        yellow

    );

    arm.position.set(2.3,6,0);

    this.crane.add(arm);

    // Counter Arm

    const counter=new THREE.Mesh(

        new THREE.BoxGeometry(1.5,.15,.15),

        yellow

    );

    counter.position.set(-0.9,6,0);

    this.crane.add(counter);

    // Cable

    const cable=new THREE.Mesh(

        new THREE.CylinderGeometry(.015,.015,2.2),

        new THREE.MeshBasicMaterial({

            color:0xffffff

        })

    );

    cable.position.set(4.4,5,0);

    this.crane.add(cable);

    // Hook

    this.hook=new THREE.Mesh(

        new THREE.BoxGeometry(.15,.15,.15),

        new THREE.MeshStandardMaterial({

            color:0xff3333

        })

    );

    this.hook.position.set(4.4,3.8,0);

    this.crane.add(this.hook);

    this.crane.position.set(-5,-1,-2);

    this.scene.add(this.crane);

}

// ==========================================================
// SPARK PARTICLES
// ==========================================================

createSparks(){

    const geometry=new THREE.BufferGeometry();

    const count=1200;

    const vertices=[];

    for(let i=0;i<count;i++){

        vertices.push(

            (Math.random()-.5)*5,

            Math.random()*6,

            (Math.random()-.5)*5

        );

    }

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            vertices,

            3

        )

    );

    const material=new THREE.PointsMaterial({

        color:0xffcc33,

        size:.035,

        transparent:true,

        opacity:.8

    });

    this.sparks=new THREE.Points(

        geometry,

        material

    );

    this.scene.add(this.sparks);

}

// ==========================================================
// CAMERA
// ==========================================================

updateCamera(){

    this.target.x=this.mouse.x*.0012;

    this.target.y=this.mouse.y*.001;

    this.camera.position.x+=(

        this.target.x-

        this.camera.position.x

    )*.04;

    this.camera.position.y+=(

        4-this.target.y-

        this.camera.position.y

    )*.04;

    this.camera.lookAt(

        this.mainGroup.position

    );

}

// ==========================================================
// CRANE ANIMATION
// ==========================================================

animateCrane(){

    const t=this.clock.getElapsedTime();

    this.crane.rotation.y=

        Math.sin(t*.25)*.18;

    this.hook.position.y=

        3.8+

        Math.sin(t*2)*.45;

}

// ==========================================================
// SPARK ANIMATION
// ==========================================================

animateSparks(){

    this.sparks.rotation.y+=0.002;

    this.sparks.position.y=

        Math.sin(

            this.clock.getElapsedTime()

        )*.08;

}

// ==========================================================
// MAIN LOOP
// ==========================================================

animate(){

    requestAnimationFrame(

        ()=>this.animate()

    );

    this.animateObjects();

    this.animateCrane();

    this.animateSparks();

    this.updateCamera();

    this.renderer.render(

        this.scene,

        this.camera

    );

}
    } // End of Interactive3DEngine class

// ============================================================
// SIMPLE UI MANAGER
// ============================================================

class UIManager{

    constructor(){

        console.log("UI Loaded");

    }

}

// ============================================================
// START WEBSITE
// ============================================================

document.addEventListener("DOMContentLoaded",()=>{

    new Interactive3DEngine();

    new UIManager();

});
