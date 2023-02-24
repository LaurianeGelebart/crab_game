"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let state = 0 ; 


/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {

    

/* ----------------- EVENT ---------------- */
canvas.addEventListener('click', (evt) => {
    sniper.cloneNode(true).play();
    evt.preventDefault() ; 
    
  
})
/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp){


    draw();
    window.requestAnimationFrame(gameLoop); // keep requesting new frames
}

/* ----------------------------- DRAW FUNCTION ----------------------------- */
function draw(){
    context.clearRect(0, 0, 1500, 750); // cleaning screen

    switch(state){

        default : // beginning of the game (-> case 0)
            
            break ; 

        case 1 : // game 
            
            break ; 

        case 2 : // end of the game 
           
            break ; 
    }    
}

