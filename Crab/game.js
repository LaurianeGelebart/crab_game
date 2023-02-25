"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let height;
let width;
let state = 1 ; 
let crabSize;
let crab1;
let crab2;
let keys = {};

const crabImage = new Image();
const rockImage = new Image();

function key(){
    for(let key in keys){
        if(keys[key]){
            if (key =="z"){
                crab1.speedY-=0.1;
            } 
            if (key =="q"){
                crab1.speedX-=0.1;
            }  
            if (key =="s"){
                crab1.speedY+=0.1;
            }  
            if (key =="d"){
                crab1.speedX+=0.1;
            }    
            if (key =="i"){
                crab2.speedY-=0.1;
            } 
            if (key =="j"){
                crab2.speedX-=0.1;
            }  
            if (key =="k"){
                crab2.speedY+=0.1;
            }  
            if (key =="l"){
                crab2.speedX+=0.1;
            }  
        }
    } 
}


/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width=window.innerWidth;
    context.canvas.height=window.innerHeight;
    height = canvas.height;
    width = canvas.width;

    

    crabSize = height/15;
    crab1 = new Crab(1, height/5, height/5);
    crab2 = new Crab(1, height/5, 4*height/5);

    crabImage.src = 'img/crab.png';
    crab1.image = crabImage;
    crab2.image = crabImage;

    rockImage.src = 'img/rock.png'

/* ----------------- EVENT ---------------- */
canvas.addEventListener('keydown', (evt) => {
    keys[evt.key] = true;
})

canvas.addEventListener('keyup', (evt) => {
    keys[evt.key] = false;
 
})
/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp){

switch(state){
    default : // beginning of the game (-> case 0)
        
    break ; 

    case 1 : // game 
        key(); 
        crab1.move();
        crab2.move();

    break ;

    case 2 : // end of the game 

    break ; 
}

    
    draw();
    window.requestAnimationFrame(gameLoop); // keep requesting new frames
}

/* ----------------------------- DRAW FUNCTION ----------------------------- */
function draw(){
    context.clearRect(0, 0, width, height); // cleaning screen

 switch(state){
    default : // beginning of the game (-> case 0)
        // context.drawImage(beginning, 0, 0);
    break ; 

    case 1 : // game 
    context.drawImage(crab1.image, crab1.x, crab1.y, crabSize, crabSize);
    context.drawImage(crab2.image, crab2.x, crab2.y, crabSize, crabSize);

    break ; 
    case 2 : // end of the game 

    break ; 
}

}

