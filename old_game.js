"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, x, y;
let state = 0 ; 
let nbWicked = 0 ; 
let wicked = [];
let points = 0 ; // Si vous vous ajoutez des points ici c'est vraiment pas cool... :(
let difficulty = 0;
let newWicked;
let random ; 
let bullets = 0;

const f11 = new Image();
const f21 = new Image();
const f31 = new Image();
const f41 = new Image();
const f12 = new Image();
const f22 = new Image();
const f32 = new Image();
const f42 = new Image();
const f13 = new Image();
const f23 = new Image();
const f33 = new Image();
const f43 = new Image();
const death = new Image();
const lose = new Image();
const beginning = new Image();

class Wicked {

    constructor(x, y, h, l, f) {
      this.xStart=x;
      this.yStart=y;
      this.x = x; //posX
      this.y = y; //posY
      this.h = h; //largeur
      this.l = l; //longueur
      this.f = f ; //perso 
      this.image;
      
      this.dead = 0 ;
      this.deathInProgress = 0 ; 
      this.timeDeath = 0 ; //
      this.direction=(this.yStart-357)/(this.xStart-1300);
      this.vitesse=2 ; 
    }

    move(){
        this.x += this.vitesse ; 
        this.y += this.direction*this.vitesse ;
    }

    animDeath(){
        
        if (this.f!=4){
            this.l = this.h ; 
            this.h = this.l-30; 
            
        }
        this.timeDeath = difficulty+30 ; 
        this.deathInProgress=1 ; 
        
    }
    chooseImage(){
        if (this.deathInProgress==0){
            if(difficulty%50 < 25){
                switch(this.f){
                    default : 
                        this.image=f11;
                        break ;
                    case 2 :
                        this.image=f21;
                        break ;
                    case 3 :
                        this.image=f31;
                        break ;
                    case 4 :
                        this.image=f41;
                        break ;
                }
            }
            else{
                switch(this.f){
                    default : 
                        this.image=f12;
                        break ;
                    case 2 :
                        this.image=f22;
                        break ;
                    case 3 :
                        this.image=f32;
                        break ;
                    case 4 :
                        this.image=f42;
                        break ;
                }
            }
        }
        else{
            switch(this.f){
                default : 
                    this.image=f13;
                    break ;
                case 2 :
                    this.image=f23;
                    break ;
                case 3 :
                    this.image=f33;
                    break ;
                case 4 :
                    this.image=f43;
                    break ;
            }
        }
    }
}



/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {

    f11.src = 'images/perso1.1.png';
    f21.src = 'images/perso2.1.png';
    f31.src = 'images/perso3.1.png';
    f41.src = 'images/perso4.1.png';
    f12.src = 'images/perso1.2.png';
    f22.src = 'images/perso2.2.png';
    f32.src = 'images/perso3.2.png';
    f42.src = 'images/perso4.2.png';
    f13.src = 'images/perso1.3.png';
    f23.src = 'images/perso2.3.png';
    f33.src = 'images/perso3.3.png';
    f43.src = 'images/perso4.3.png';
    death.src = 'images/perso1.3.png'
    lose.src = 'images/perdu.png';
    beginning.src = 'images/debut.png';
    var sniper = new Audio('sons/sniper.wav');
    var reload = new Audio('sons/reload.mp3');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    
    for(let i=0; i<100; i++){ //create 100 wickeds
        x = 0 ;
        y = Math.floor(Math.random() * 300) + 340;
        random = Math.random(); 
        if (random<0.25)  wicked[i] = new Wicked(x, y, 85, 60, 1)  ;  
        else if (random>0.25 && random<=0.5)  wicked[i] = new Wicked(x, y, 85, 60, 2) 
        else if (random>0.5 && random<=0.75)  wicked[i] = new Wicked(x, y, 85, 60, 3)  ; 
        else  wicked[i] = new Wicked(x, y, 80, 100, 4) ; 

       
    }
    

/* ----------------- EVENT ---------------- */
canvas.addEventListener('click', (evt) => {
    sniper.cloneNode(true).play();
    evt.preventDefault() ; 
    
    bullets++;
    if (bullets%6==0){
        reload.cloneNode(true).play();
    }
    switch(state){

        default : // beginning of the game (-> case 0)
            if(evt.x >= 760 && evt.x <= 1200 
            && evt.y >= 650 && evt.y <= 790) state = 1 ; 
            break ; 

        case 1 : // game 
            // if click on wicked
            for(let i=0; i<nbWicked; i++){
                if(!wicked[i].dead && !wicked[i].deathInProgress) {
                    if (evt.x-200 >= wicked[i].x && evt.x-200 <= (wicked[i].x + wicked[i].l) 
                    && evt.y-150 >= wicked[i].y && evt.y-150 <= (wicked[i].y + wicked[i].h)) {
                            wicked[i].animDeath();  
                            points ++ ; 
                            break;
                    }  
                }
            }
            break ; 

        case 2 : // end of the game 
            if(true) state = 1 ; 
            sendToPHP();
            break ; 
    }
})
/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp){
    difficulty++;
    switch(state){

        default : // beginning of the game (-> case 0)
            
            break ; 

        case 1 : // game 
           // if (nbWicked<100){
                newWicked = (Math.random()+difficulty/1000000) > 0.99 ? 1 : 0;
                if (newWicked==1){
                    nbWicked++;
                    x = 0 ;
                    y = Math.floor(Math.random() * 300) + 340;
                    random = Math.random(); 
                    if (random<0.25)  wicked[nbWicked] = new Wicked(x, y, 85, 60, 1)  ;  
                    else if (random>0.25 && random<=0.5)  wicked[nbWicked] = new Wicked(x, y, 85, 60, 2) 
                    else if (random>0.5 && random<=0.75)  wicked[nbWicked] = new Wicked(x, y, 85, 60, 3)  ; 
                    else  wicked[nbWicked] = new Wicked(x, y, 80, 100, 4) ; 
                }
         //   }
            
            for(let i=0; i<nbWicked; i++){
                wicked[i].chooseImage(); 
                if(!wicked[i].dead && !wicked[i].deathInProgress) wicked[i].move();
                if (wicked[i].deathInProgress && wicked[i].timeDeath < difficulty) wicked[i].dead = 1 ; 
                if(wicked[i].x > 1200) state=2 ;  
            }
            break ; 

        case 2 : // end of the game 
            
            break ; 
    }

    draw();
    window.requestAnimationFrame(gameLoop); // keep requesting new frames
}

/* ----------------------------- DRAW FUNCTION ----------------------------- */
function draw(){
    context.clearRect(0, 0, 1500, 750); // cleaning screen

    switch(state){

        default : // beginning of the game (-> case 0)
            context.drawImage(beginning, 0, 0);
            break ; 

        case 1 : // game 
            for(let i=0; i<nbWicked; i++){ 
                if(!(wicked[i].dead)){
                    context.drawImage(wicked[i].image, wicked[i].x, wicked[i].y, wicked[i].l, wicked[i].h);
               }
            }
            context.font = '60px serif';
            context.fillText(points, 20, 55);
            break ; 

        case 2 : // end of the game 
            context.drawImage(lose, 0, 0);
            break ; 
    }    
}


function sendToPHP(){
    const d = new Date();
    d.setTime(d.getTime() + (24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = "points" + "=" + points + ";" + expires + ";path=/";

    window.location.reload(false); 

}

