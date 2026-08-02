let scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);


let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);


let renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(renderer.domElement);


// LIGHT

let sun = new THREE.DirectionalLight(
0xffffff,
1
);

sun.position.set(10,20,10);
scene.add(sun);

scene.add(
new THREE.AmbientLight(0xffffff,0.4)
);


// BLOCK SYSTEM

let blocks=[];


function addBlock(x,y,z,type){

let color;

if(type=="grass")
color=0x55aa33;

if(type=="dirt")
color=0x8b4513;

if(type=="stone")
color=0x777777;


let geometry =
new THREE.BoxGeometry(
1,1,1
);


let material =
new THREE.MeshLambertMaterial({
color:color
});


let cube =
new THREE.Mesh(
geometry,
material
);


cube.position.set(
x,y,z
);


scene.add(cube);

blocks.push(cube);

}


// WORLD GENERATION

for(let x=-15;x<=15;x++){

for(let z=-15;z<=15;z++){

addBlock(
x,
0,
z,
"grass"
);


addBlock(
x,
-1,
z,
"dirt"
);


if(Math.random()>0.8){

addBlock(
x,
1,
z,
"stone"
);

}

}

}


// PLAYER

let player = {

x:0,
y:2,
z:5,
speed:0.15

};


let playerMesh =
new THREE.Mesh(

new THREE.BoxGeometry(
0.8,1.8,0.8
),

new THREE.MeshLambertMaterial({
color:0xff0000
})

);


scene.add(playerMesh);


// CAMERA

camera.position.set(
0,
4,
8
);


// CONTROLS

let keys={};


document.addEventListener(
"keydown",
e=>{
keys[e.key]=true;
}
);


document.addEventListener(
"keyup",
e=>{
keys[e.key]=false;
}
);


// MOVE

function updatePlayer(){

if(keys["w"] || keys["ArrowUp"])
player.z-=player.speed;


if(keys["s"] || keys["ArrowDown"])
player.z+=player.speed;


if(keys["a"] || keys["ArrowLeft"])
player.x-=player.speed;


if(keys["d"] || keys["ArrowRight"])
player.x+=player.speed;



playerMesh.position.set(
player.x,
player.y,
player.z
);


camera.position.set(
player.x,
player.y+3,
player.z+7
);


camera.lookAt(
playerMesh.position
);

}



// RESIZE

window.addEventListener(
"resize",
()=>{

camera.aspect=
window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);

});



// GAME LOOP

function animate(){

requestAnimationFrame(animate);

updatePlayer();

renderer.render(
scene,
camera
);

}


animate();
