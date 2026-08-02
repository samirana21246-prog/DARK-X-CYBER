const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize",resize);


// PLAYER
let player = {
    x:0,
    y:0,
    size:40,
    speed:6,
    color:"#ff3333"
};


// CAMERA
let camera={
    x:0,
    y:0
};


// WORLD
let world=[];
let blockSize=50;
let worldWidth=40;
let worldHeight=12;


// BLOCK TYPES
const blocks={
    grass:"#55aa33",
    dirt:"#8b4513",
    stone:"#777",
    wood:"#a0522d"
};


// CREATE WORLD
function createWorld(){

    for(let x=0;x<worldWidth;x++){

        let ground=Math.floor(Math.random()*3)+7;

        for(let y=0;y<worldHeight;y++){

            if(y>=ground){

                let type="dirt";

                if(y===ground)
                    type="grass";

                if(y>ground+3)
                    type="stone";


                world.push({
                    x:x*blockSize,
                    y:y*blockSize,
                    type:type
                });
            }
        }
    }

}

createWorld();


// CONTROLS
let keys={};

document.addEventListener("keydown",e=>{
    keys[e.key]=true;
});

document.addEventListener("keyup",e=>{
    keys[e.key]=false;
});


// TOUCH BUTTONS
function move(dir){

    if(dir==="left")
        player.x-=player.speed;

    if(dir==="right")
        player.x+=player.speed;

    if(dir==="up")
        player.y-=player.speed;

    if(dir==="down")
        player.y+=player.speed;
}


// BLOCK PLACE
canvas.addEventListener("click",function(e){

    let x=Math.floor(
        (e.clientX+camera.x)/blockSize
    )*blockSize;

    let y=Math.floor(
        (e.clientY+camera.y)/blockSize
    )*blockSize;


    world.push({
        x:x,
        y:y,
        type:"grass"
    });

});


// UPDATE
function update(){

    if(keys["ArrowLeft"])
        player.x-=player.speed;

    if(keys["ArrowRight"])
        player.x+=player.speed;

    if(keys["ArrowUp"])
        player.y-=player.speed;

    if(keys["ArrowDown"])
        player.y+=player.speed;


    camera.x=player.x-canvas.width/2;
    camera.y=player.y-canvas.height/2;

}


// DRAW
function draw(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // WORLD DRAW

    world.forEach(block=>{

        let x=block.x-camera.x;
        let y=block.y-camera.y;


        ctx.fillStyle=blocks[block.type];

        ctx.fillRect(
            x,
            y,
            blockSize,
            blockSize
        );


        ctx.strokeStyle="#222";

        ctx.strokeRect(
            x,
            y,
            blockSize,
            blockSize
        );

    });



    // PLAYER DRAW

    ctx.fillStyle=player.color;

    ctx.fillRect(
        player.x-camera.x,
        player.y-camera.y,
        player.size,
        player.size
    );


    requestAnimationFrame(loop);

}


// GAME LOOP
function loop(){

    update();
    draw();

}


loop();
