(()=>{const $=e=>document.querySelector(e),$$=e=>document.querySelectorAll(e);

class Engine{
constructor(){
this.c=$("#webgl-container");
if(!this.c)return;
this.s=new THREE.Scene();
this.cam=new THREE.PerspectiveCamera(60,innerWidth/innerHeight,.1,1000);
this.cam.position.set(0,3,11);
this.mobile=innerWidth<768||matchMedia("(pointer:coarse)").matches;
this.r=new THREE.WebGLRenderer({alpha:1,antialias:!this.mobile});
this.r.setPixelRatio(Math.min(devicePixelRatio,this.mobile?1.5:2));
this.r.setSize(innerWidth,innerHeight);
this.c.appendChild(this.r.domElement);
this.clock=new THREE.Clock();
this.mx=0;this.my=0;
this.tx=0;this.ty=0;
this.boxes=[];
this.rings=[];
this.init();
}

init(){
this.light();
this.particles();
this.building();
this.floating();
this.events();
this.loop();
}

light(){
let a=new THREE.AmbientLight(0xffffff,1.5);
this.s.add(a);

let d=new THREE.DirectionalLight(0xffffff,2);
d.position.set(10,20,15);
this.s.add(d);

let p=new THREE.PointLight(0xe63946,30,80);
p.position.set(-5,6,8);
this.s.add(p);
}

particles(){

let g=new THREE.BufferGeometry(),v=[],n=this.mobile?1800:5000;

for(let i=0;i<n;i++)
v.push((Math.random()-.5)*80,Math.random()*30,(Math.random()-.5)*80);

g.setAttribute("position",new THREE.Float32BufferAttribute(v,3));

let m=new THREE.PointsMaterial({
color:0xe63946,
size:.05,
transparent:1,
opacity:.45
});

this.p=new THREE.Points(g,m);

this.s.add(this.p);

}

building(){

this.grp=new THREE.Group();

let mat=new THREE.MeshStandardMaterial({
color:0x777777,
roughness:.8
});

let glass=new THREE.MeshStandardMaterial({
color:0x4fa8ff,
transparent:1,
opacity:.75,
emissive:0x4fa8ff,
emissiveIntensity:.3
});

for(let i=0;i<16;i++){

let f=new THREE.Mesh(
new THREE.BoxGeometry(2.6,.25,2.6),
mat);

f.position.y=i*.4;

this.grp.add(f);

for(let j=-2;j<=2;j++){

let w=new THREE.Mesh(
new THREE.BoxGeometry(.25,.18,.05),
glass);

w.position.set(j*.45,i*.4,1.33);

this.grp.add(w);

}

}

for(let i=0;i<4;i++){

let r=new THREE.Mesh(

new THREE.TorusGeometry(
2.2+i*.45,.03,16,120),

new THREE.MeshBasicMaterial({
color:0xe63946,
transparent:1,
opacity:.35
})

);

r.rotation.x=Math.PI/2;

r.position.y=2.5;

this.grp.add(r);

this.rings.push(r);

}

this.grp.position.set(4,-1,-2);

this.s.add(this.grp);

}

floating(){

let m=new THREE.MeshStandardMaterial({
color:0x555555
});

let boxCount=this.mobile?18:40;

for(let i=0;i<boxCount;i++){

let b=new THREE.Mesh(

new THREE.BoxGeometry(
Math.random()*.3+.15,
Math.random()*.3+.15,
Math.random()*.3+.15),

m);

b.position.set(
(Math.random()-.5)*10,
Math.random()*6,
(Math.random()-.5)*8);

b.userData={
a:Math.random()*6.28,
s:Math.random()*.02+.003
};

this.s.add(b);

this.boxes.push(b);

}

}

events(){

addEventListener("resize",()=>{

this.cam.aspect=innerWidth/innerHeight;

this.cam.updateProjectionMatrix();

this.r.setSize(innerWidth,innerHeight);

});

addEventListener("mousemove",e=>{

this.mx=e.clientX-innerWidth/2;

this.my=e.clientY-innerHeight/2;

});

}

anim(){

let t=this.clock.getElapsedTime();

this.p.rotation.y+=.0005;

this.grp.rotation.y+=.003;

this.grp.position.y=Math.sin(t)*.15;

this.rings.forEach((r,i)=>{

r.rotation.z+=.004+i*.002;

r.scale.setScalar(1+Math.sin(t+i)*.02);

});

this.boxes.forEach(b=>{

b.userData.a+=b.userData.s;

b.position.y+=Math.sin(b.userData.a)*.01;

b.rotation.x+=.01;

b.rotation.y+=.01;

});

this.tx=this.mx*.0012;

this.ty=this.my*.001;

this.cam.position.x+=(this.tx-this.cam.position.x)*.03;

this.cam.position.y+=(4-this.ty-this.cam.position.y)*.03;

this.cam.lookAt(this.grp.position);

}

loop(){

requestAnimationFrame(()=>this.loop());

this.anim();

this.r.render(this.s,this.cam);

}

}

class UI{

constructor(){

this.aos();

this.preloader();

this.menu();

this.slider();

this.cursor();

}

aos(){

if(typeof AOS==="undefined")return;

AOS.init({
duration:900,
easing:"ease-out-cubic",
once:true,
offset:60
});

}

cursor(){

let isTouch=matchMedia("(hover:none),(pointer:coarse)").matches;

let c1=$(".cursor"),c2=$(".cursor2");

if(isTouch||!c1||!c2)return;

document.body.classList.add("has-cursor");

let x=0,y=0,x2=0,y2=0;

addEventListener("mousemove",e=>{

x=e.clientX;
y=e.clientY;

c1.style.transform=`translate(${x-7.5}px,${y-7.5}px)`;

});

const follow=()=>{

x2+=(x-x2)*.15;
y2+=(y-y2)*.15;

c2.style.transform=`translate(${x2-22.5}px,${y2-22.5}px)`;

requestAnimationFrame(follow);

};

follow();

}

preloader(){

window.addEventListener("load",()=>{

let p=$("#preloader");

if(p){

p.style.opacity="0";

setTimeout(()=>p.remove(),700);

}

});

}

menu(){

const btn=$(".menu-btn"),
nav=$(".nav-menu"),
links=$$(".nav-menu a");

if(btn&&nav){

btn.onclick=()=>{

nav.classList.toggle("active");

btn.classList.toggle("open");

document.body.classList.toggle("no-scroll");

};

}

links.forEach(l=>{

l.onclick=()=>{

if(nav)nav.classList.remove("active");

if(btn)btn.classList.remove("open");

document.body.classList.remove("no-scroll");

};

});

}

slider(){

if(typeof Swiper==="undefined")return;

let el=$(".heroSwiper");

if(!el)return;

new Swiper(".heroSwiper",{
loop:true,
speed:1200,
effect:"fade",
fadeEffect:{crossFade:true},
autoplay:{
delay:4500,
disableOnInteraction:false
}
});

}

reveal(){

let els=$$(".reveal");

let obs=new IntersectionObserver(e=>{

e.forEach(x=>{

if(x.isIntersecting)

x.target.classList.add("show");

});

},{threshold:.15});


els.forEach(e=>obs.observe(e));

}

counter(){

let nums=$$(".counter");

let obs=new IntersectionObserver(entries=>{

entries.forEach(e=>{

if(!e.isIntersecting)return;

let el=e.target;

let target=+el.dataset.count||0;

let n=0;

let step=Math.ceil(target/80);


let timer=setInterval(()=>{

n+=step;

if(n>=target){

n=target;

clearInterval(timer);

}

el.innerText=n.toLocaleString();

},20);


obs.unobserve(el);

});

});


nums.forEach(n=>obs.observe(n));

}

smooth(){

$$("a[href^='#']").forEach(a=>{

a.onclick=e=>{

let t=$(a.getAttribute("href"));

if(t){

e.preventDefault();

t.scrollIntoView({

behavior:"smooth"

});

}

};

});

}

estimator(){

let slider=$("#area-slider"),
areaLabel=$("#area-value"),
type=$("#construction-type"),
priceOut=$("#total-price");

if(!slider||!type||!priceOut)return;

let calc=()=>{

let area=+slider.value||0;

let rate=+type.value||3500;

let result=area*rate;

if(areaLabel)areaLabel.innerText=area.toLocaleString();

priceOut.innerText=result.toLocaleString();

};

slider.addEventListener("input",calc);

type.addEventListener("change",calc);

calc();

}

}

class Crane{

constructor(){

this.group=new THREE.Group();

this.hook=null;

this.load();

}

load(){

let yellow=new THREE.MeshStandardMaterial({

color:0xffcc00,

metalness:.5

});


let beam=new THREE.Mesh(

new THREE.BoxGeometry(8,.15,.15),

yellow

);

beam.position.y=5;

this.group.add(beam);


let tower=new THREE.Mesh(

new THREE.BoxGeometry(.25,6,.25),

yellow

);

tower.position.y=2;

this.group.add(tower);


let cable=new THREE.Mesh(

new THREE.CylinderGeometry(.02,.02,2),

new THREE.MeshBasicMaterial({

color:0x222222

})

);


cable.position.set(2.8,3.8,0);

this.group.add(cable);


this.hook=new THREE.Mesh(

new THREE.TorusGeometry(.18,.04,12,30),

yellow

);


this.hook.rotation.x=Math.PI/2;

this.hook.position.set(2.8,2.8,0);

this.group.add(this.hook);


this.group.position.set(-3,0,-4);

}

update(t){

if(!this.hook)return;

this.hook.position.y=

2.8+Math.sin(t*2)*.4;

}

}

class Dust{

constructor(scene){

this.s=scene;

let g=new THREE.BufferGeometry();

let p=[];

let count=(ENGINE&&ENGINE.mobile)?350:900;

for(let i=0;i<count;i++){

p.push(

(Math.random()-.5)*20,

Math.random()*4,

(Math.random()-.5)*10

);

}


g.setAttribute(

"position",

new THREE.Float32BufferAttribute(p,3)

);


let m=new THREE.PointsMaterial({

color:0xc9b27c,

size:.025,

transparent:true,

opacity:.25

});


this.obj=new THREE.Points(g,m);

scene.add(this.obj);

}

update(){

this.obj.rotation.y+=.001;

}

}

let ENGINE,

CRANE,

DUST;

function boot(){

ENGINE=new Engine();

CRANE=new Crane();

ENGINE.s.add(CRANE.group);

DUST=new Dust(ENGINE.s);

let old=ENGINE.anim.bind(ENGINE);

ENGINE.anim=function(){

old();

let t=this.clock.getElapsedTime();

CRANE.update(t);

DUST.update();

};

let ui=new UI();

ui.reveal();

ui.counter();

ui.smooth();

ui.estimator();

}

document.addEventListener(

"DOMContentLoaded",

boot

);

})();
