"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, height, width;
let state = 1 ; 
let crabSize;
let zoneSize, zones ; 
let clothings, hats, shooes, glasses ; 
let keys = {};
let rockCoords = [];
let rockList = [];
let crabList = [];
let hitbox = 0.8;
let totalSeconds=0;

let seagullTime;
let seagullSound;
let seagull;
let seagullSize;

const crabImage = new Image();
const rockImage = new Image();
const seagullImage = new Image();
const hat1 = new Image();
const hat2 = new Image();
const shooes11 = new Image();
const shooes12 = new Image();
const shooes21 = new Image();
const shooes22 = new Image();
const glasses1 = new Image();
const glasses2 = new Image();




/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width=window.innerWidth;
    context.canvas.height=window.innerHeight;
    height = canvas.height;
    width = canvas.width;

    rockImage.src = 'img/rock.png';
    crabImage.src = 'img/crab.png';
    seagullImage.src = 'img/seagull.png';
    hat1.src = 'img/hat.png';
    hat2.src = 'img/hat.png';
    shooes11.src = 'img/hat.png';
    shooes11.src = 'img/hat.png';
    shooes21.src = 'img/hat.png';
    shooes22.src = 'img/hat.png';
    glasses1.src = 'img/hat.png';
    glasses2.src = 'img/hat.png';


    // Clothings
    clothings = [
        [
            new Clothing(20, hat1, hat1),
            new Clothing(20, hat2, hat2)
        ], 
        [
            new Clothing(30, shooes11, shooes12),
            new Clothing(30, shooes21, shooes22)
        ], 
        [
            new Clothing(10, glasses1, glasses1),
            new Clothing(10, glasses2, glasses2)
        ]
    ] ; 

    // Crabs
    crabSize = height/15;
    crabList = [
        new Crab(1, height/5, height/5, crabImage),
        new Crab(2, height/5, 4*height/5, crabImage)
    ]
    
    // Rocks
    let rockSize = height/10;

    rockList = [
        new Rock(height/7,3*height/5,rockSize,rockSize,rockImage, hitbox),
        new Rock(2*height/3,height/2,rockSize,rockSize,rockImage, hitbox),
        new Rock(height/8,height/2,rockSize,rockSize,rockImage, hitbox),
        new Rock(5*height/7,3*height/4,rockSize,rockSize,rockImage, hitbox)
    ];


    // Zones
    zoneSize=  100 ; 
    zones = [
        new Zone(3*width-width/5,height-height/2, zoneSize, zoneSize, (random(0,3)-1), random(0,1)),
        new Zone(width-width/5, height-4*height/5, zoneSize, zoneSize, (random(0,3)-1), random(0,1)),
        new Zone(width-4*width/5, height-2*height/5, zoneSize, zoneSize, (random(0,3)-1), random(0,1)),
        new Zone(width-width/2, height-7*height/8, zoneSize, zoneSize, (random(0,3)-1), random(0,1)),
        new Zone(width-6*width/8, height-2*height/3, zoneSize, zoneSize, (random(0,3)-1), random(0,1))
    ]


    // Time
    setInterval(()=>{totalSeconds++;},1000)
    seagullSound = new Audio('sound/seagull.mp3');
    seagullTime = getTimeOfNextSeagull(totalSeconds);

    seagullSize = height/10;
    seagull = new Seagull();



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
        is_in_zone(); 

        crabMovement();
        
        seagullActivity();
        

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

    draw_zone(); 

    drawCrabs();

    drawRocks();

    drawSeagull();

    drawTimer();
    
    
    break ; 
    case 2 : // end of the game 

    break ; 
}

}

/* ----------------------------- OTHERS FUNCTIONS ----------------------------- */

function getTimeOfNextSeagull(seconds){
    return seconds+random(5,15);
}

function seagullActivity(){
    if (seagullTime==totalSeconds){
        seagullSound.play();
    }

    if (seagullTime+2==totalSeconds){

        crabList.forEach((crab) => {
            if (crab.hidden==0){
                seagull.hunt(crab);
            }
        })
        seagull.move();
    }
}


function is_in_zone(){
    
}

function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function key(){
    for(let key in keys){
        if(keys[key]){
            if (key =="z"){
                crabList[0].speedY-=0.1;
            } 
            if (key =="q"){
                crabList[0].speedX-=0.1;
            }  
            if (key =="s"){
                crabList[0].speedY+=0.1;
            }  
            if (key =="d"){
                crabList[0].speedX+=0.1;
            }    
            if (key =="i"){
                crabList[1].speedY-=0.1;
            } 
            if (key =="j"){
                crabList[1].speedX-=0.1;
            }  
            if (key =="k"){
                crabList[1].speedY+=0.1;
            }  
            if (key =="l"){
                crabList[1].speedX+=0.1;
            }  
        }
    } 
}

function collision(crab){

    if(crab.x < 0 || crab.x+crabSize>width){
        crab.speedX = -crab.speedX;
        return true;
    }
    if(crab.y < 0 || crab.y+crabSize>height){
        crab.speedY = -crab.speedY;
        return true;
    }
    rockList.forEach((rock) =>{
        
        if(rock.xHitbox <= crab.x + crabSize && 
           rock.xHitbox + rock.width*hitbox >= crab.x  &&
           rock.yHitbox <= crab.y + crabSize &&
           rock.yHitbox + rock.length*hitbox >= crab.y){
            
            if(rock.occupied == 0){
                rock.occupied = crab.id;
                crab.hidden=1;
            }
            else if(rock.occupied != crab.id){
                
                if(Math.abs(crab.x-rock.xHitbox)<=Math.abs(crab.y-rock.yHitbox)){
                    crab.speedY=-crab.speedY*2.5;
                }
                else if(Math.abs(crab.x-rock.xHitbox)>=Math.abs(crab.y-rock.yHitbox)){
                    crab.speedX=-crab.speedX*2.5;
                }
                return true;
            }
        }
        else{
            crab.hidden=0;
        }
    })

    return false;
}



function crabMovement(){
    
    let oldX;
    let oldY;

    crabList.forEach((crab) =>{
        oldX = crab.x;
        oldY = crab.y;
        crab.move();
        if(collision(crab)){
            crab.x = oldX;
            crab.y = oldY;
        }
    })
    
}


function drawTimer(){
    context.font = '60px serif';
    if(totalSeconds%60>=10)
        context.fillText(Math.floor(totalSeconds/60)+":"+totalSeconds%60, 20, 55);
    else
    context.fillText(Math.floor(totalSeconds/60)+":0"+totalSeconds%60, 20, 55);
}

function drawRocks(){
    rockList.forEach((rock) => {
        context.drawImage(rock.image, rock.x, rock.y, rock.width, rock.length);
        
    })

}

function draw_zone(){
    for (let i in zones){
        if(zones[i].object>-1){
            context.drawImage(clothings[zones[i].object][zones[i].type].active_image, zones[i].x, zones[i].y, zones[i].width, zones[i].height);
        }
    }
}

function drawCrabs(){
    crabList.forEach((crab) => {
        context.drawImage(crab.image, crab.x, crab.y, crabSize, crabSize);
    })
}

function drawSeagull(){
    if (seagull.hunting){
        context.drawImage(seagull.image, seagull.x, seagull.y, seagullSize, seagullSize);
    }
}