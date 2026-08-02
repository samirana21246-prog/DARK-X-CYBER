let scene, camera, renderer;
let player, blocks = [];
let keys = {};


// SCENE

scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// CAMERA

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
);


// RENDERER

renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

document.body.appendChild(
renderer.domElement
);



// LIGHT

let sun = new THREE.DirectionalLight(
0xffffff,
1
);

sun.position.set(
20,
30,
10
);

scene.add(sun);


scene.add(
new THREE.AmbientLight(
0xffffff,
0.5
)
);



// BLOCK MATERIALS

let materials = {

grass:new THREE.MeshLambertMaterial({
color:0x55aa33
}),

dirt:new THREE.MeshLambertMaterial({
color:0x8b4513
}),

stone:new THREE.MeshLambertMaterial({
color:0x777777
}),

wood:new THREE.MeshLambertMaterial({
color:0xa0522d
})

};



// CREATE BLOCK

function createBlock(
x,y,z,type
){

let geo =
new THREE.BoxGeometry(
1,1,1
);


let block =
new THREE.Mesh(
geo,
materials[type]
);


block.position.set(
x,y,z
);


scene.add(block);


blocks.push(block);

}



// WORLD GENERATION

function generateWorld(){


for(
let x=-20;
x<=20;
x++
){


for(
let z=-20;
z<=20;
z++
){


createBlock(
x,
0,
z,
"grass"
);


createBlock(
x,
-1,
z,
"dirt"
);



if(
Math.random()>0.85
){

createBlock(
x,
1,
z,
"stone"
);

}



}


}



}



generateWorld();




// PLAYER


player={

x:0,

y:2,

z:5,

speed:0.15

};



let playerCube =
new THREE.Mesh(

new THREE.BoxGeometry(
0.8,
1.8,
0.8
),

new THREE.MeshLambertMaterial({
color:0xff3333
})

);


scene.add(
playerCube
);



// CAMERA START

camera.position.set(
0,
4,
8
);



// KEY CONTROL


document.addEventListener(
"keydown",
(e)=>{

keys[e.key]=true;

});


document.addEventListener(
"keyup",
(e)=>{

keys[e.key]=false;

});




// MOBILE BUTTONS


function buttonMove(id,key){

let btn=document.getElementById(id);

if(btn){

btn.addEventListener(
"touchstart",
()=>keys[key]=true
);


btn.addEventListener(
"touchend",
()=>keys[key]=false
);

}

}


buttonMove("left","a");
buttonMove("right","d");
buttonMove("forward","w");
buttonMove("back","s");





// PLAYER UPDATE


function updatePlayer(){


if(
keys["w"] ||
keys["ArrowUp"]
)

player.z-=player.speed;



if(
keys["s"] ||
keys["ArrowDown"]
)

player.z+=player.speed;



if(
keys["a"] ||
keys["ArrowLeft"]
)

player.x-=player.speed;



if(
keys["d"] ||
keys["ArrowRight"]
)

player.x+=player.speed;




playerCube.position.set(

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
playerCube.position
);


}



// BLOCK BREAK / PLACE BASE


window.addEventListener(
"click",
function(){

let block =
blocks[0];


if(block){

scene.remove(block);

blocks.shift();

}

});





// GAME LOOP


function animate(){


requestAnimationFrame(
animate
);


updatePlayer();


renderer.render(
scene,
camera
);


}


animate();




// RESIZE


window.addEventListener(
"resize",
()=>{


camera.aspect =
window.innerWidth /
window.innerHeight;


camera.updateProjectionMatrix();


renderer.setSize(
window.innerWidth,
window.innerHeight
);


});
