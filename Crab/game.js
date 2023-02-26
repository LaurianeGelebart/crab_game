"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, height, width;
let state = 0, menuState = 0 ;
let mapSelection;
let zoneSize, zones, zones1, zones2 ; 
let seagullTime, seagullSound, seagull;
let clothings ; 
let keys = {};
let tabCrabImage, tabCrabCoupleImages ; 
let rockCoords = [];
let rockList, rockList1, rockList2;
let crabList, crabListNoBot, crabListBot;
let crabSound, musicMenu, musicGame, splash0, splash1, splash2, splash3, splash4;
let splashList = [splash1, splash2, splash3, splash4];
let alert = false;
let hitbox = 0.8;
let cooldown = 100;
let totalSeconds = 1;
let gatheringTime = 750;
let play_button, how_button;
let animationSize = 1;
let buttonsSet, homeButton, choiceButton, goalButton;
let mouseX = 0, mouseY = 0, clickX = -1, clickY = -1;
let pret1=false, pret2=false, botChoice=false; 
let crab1Choice = 1, crab2Choice = 0; 

let maxScore;
let winners = [];
let winningMsg = "";

let iter = 0;

const background1 = new Image();
const background2 = new Image();
let crab1 = new Image();
let crab2 = new Image();

const crabImage11 = new Image();
const crabImage12 = new Image();
const crabImage21 = new Image();
const crabImage22 = new Image();
const crabImage31 = new Image();
const crabImage32 = new Image();

const rockImage11 = new Image();
const rockImage12 = new Image();
const rockImage13 = new Image();
const rockImage21 = new Image();
const rockImage22 = new Image();

const seagullImage1 = new Image();
const seagullImage2 = new Image();


const hat1 = new Image();
const hat1Preview = new Image();
const hat2 = new Image();
const hat2Preview = new Image();
const hat3 = new Image();
const hat3Preview = new Image();

const shoes1Preview = new Image();
const shoes11 = new Image();
const shoes12 = new Image();
const shoes2Preview = new Image();
const shoes21 = new Image();
const shoes22 = new Image();
const shoes3Preview = new Image();
const shoes31 = new Image();
const shoes32 = new Image();

const glasses1 = new Image();
const glasses1Preview = new Image();
const glasses2 = new Image();
const glasses2Preview = new Image();
const glasses3 = new Image();
const glasses3Preview = new Image();

const hand1 = new Image();
const hand1Preview = new Image();
const hand2 = new Image();
const hand2Preview = new Image();
const hand3 = new Image();
const hand3Preview = new Image();

const loadingRectangle = new Image();
const loadingRectangleFill = new Image();

const imageAttack1 = new Image();
const imageAttack2 = new Image();
const imageAttack3 = new Image();
const imageAttack4 = new Image();
const imageAttack5 = new Image();
const imageAttack6 = new Image();
const imageAttack7 = new Image();
const imageAttack8 = new Image();

const imageAttacks = [
    imageAttack1,
    imageAttack2,
    imageAttack3,
    imageAttack4,
    imageAttack5,
    imageAttack6,
    imageAttack7,
    imageAttack8
]

// background
let background = new Image();
let backgroundG1 = new Image();
let backgroundG2 = new Image();
const alertImage = new Image();
const beginning = new Image();
const quick = new Image();
const goal = new Image();
const fight = new Image();
const danger = new Image();
const choice = new Image();
const pause = new Image();
const playWithBot = new Image();

const playB = new Image();
const howB = new Image();
const arrowL = new Image();
const arrowR = new Image();
const bot = new Image();
const bot2 = new Image();
const ok1 = new Image();
const ok2 = new Image();

const klarence = new Image();
const kapucine = new Image();
const karlos = new Image();

tabCrabImage = [klarence,kapucine,karlos]; 
tabCrabCoupleImages = [
    [crabImage11, crabImage12], 
    [crabImage21, crabImage22],
    [crabImage31, crabImage32]
]



/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;

    
    background1.src = 'img/background1.png';
    background2.src = 'img/background2.png';
    if(mapSelection==0)
        background = background1;
    else
        background = background2;

    rockImage11.src = 'img/rock11.png';
    rockImage12.src = 'img/rock12.png';
    rockImage13.src = 'img/rock13.png';
    rockImage22.src = 'img/rock22.png';
    rockImage21.src = 'img/rock21.png';
    
    crabImage11.src = 'img/crab11.png';
    crabImage12.src = 'img/crab12.png';
    crabImage21.src = 'img/crab21.png';
    crabImage22.src = 'img/crab22.png';
    crabImage31.src = 'img/crab21.png';
    crabImage32.src = 'img/crab22.png';
    seagullImage1.src = 'img/seagull1.png';
    seagullImage2.src = 'img/seagull2.png';


    hat1.src = 'img/hat1.png';
    hat1Preview.src = 'img/hat1P.png';
    hat2.src = 'img/hat2.png';
    hat2Preview.src = 'img/hat2P.png';
    hat3.src = 'img/hat3.png';
    hat3Preview.src = 'img/hat3P.png';

    shoes11.src = 'img/shoes1.png';
    shoes1Preview.src = 'img/shoes1P.png';
    shoes12.src = 'img/shoes12.png';
    shoes21.src = 'img/shoes1.png';
    shoes2Preview.src = 'img/shoes1P.png';
    shoes22.src = 'img/shoes12.png';
    shoes31.src = 'img/shoes1.png';
    shoes3Preview.src = 'img/shoes1P.png';
    shoes32.src = 'img/shoes12.png';

    glasses1.src = 'img/glasses.png';
    glasses1Preview.src = 'img/glasses1P.png';
    glasses2.src = 'img/glasses2.png';
    glasses2Preview.src = 'img/glasses2P.png';
    glasses3.src = 'img/glasses3.png';
    glasses3Preview.src = 'img/glasses3P.png';

    hand1.src = 'img/hand1.png';
    hand1Preview.src = 'img/hand1P.png';
    hand2.src = 'img/hand2.png';
    hand2Preview.src = 'img/hand2P.png';
    hand3.src = 'img/hand2.png';
    hand3Preview.src = 'img/hand2P.png';

    alertImage.src = 'img/alert.png';

    loadingRectangle.src = 'img/loadingRectangle.png';
    loadingRectangleFill.src = 'img/loadingRectangleFill.png';

    for (let i = 0; i < 8; i++) {
        imageAttacks[i].src = 'img/attack' + (i + 1) + '.png';
    }
    
    choice.src = 'img/choice.png';
    quick.src = 'img/vite.png';
    beginning.src = 'img/home.png';
    danger.src = 'img/attention.png';
    fight.src = 'img/attaquer.png';
    goal.src = 'img/objectif.png';
    playWithBot.src = 'img/botBack.png';
    pause.src = 'img/pause.png';

    playB.src = 'img/jouer.png';
    howB.src = 'img/comment.png';
    arrowR.src = 'img/arrowR.png';
    arrowL.src = 'img/arrowL.png';
    arrowR.src = 'img/arrowR.png';
    bot.src = 'img/playBot.png';
    bot2.src = 'img/playBotOK.png';
    ok1.src = 'img/pret.png';
    ok2.src = 'img/pretOk.png';

    klarence.src = 'img/klarence.png';
    kapucine.src = 'img/kapucine.png';
    karlos.src = 'img/karlos.png';

    crab1 = tabCrabImage[crab1Choice] ; 
    crab2 = tabCrabImage[crab2Choice] ; 


    for(let i in splashList){
        splashList[i] = new Audio();
        splashList[i].src = 'sound/splash'+i+'.wav';
        splashList[i].volume=0.2;
    }


    musicGame = new Audio('sound/musique.wav');
    musicMenu = new Audio('sound/menu.wav');
    musicGame.volume=0;
    musicGame.loop=true;
    musicMenu.volume=0.5;
    musicMenu.loop=true;

    // Clothings
    clothings = [
        [
            new Clothing(1, hat1, hat1, hat1Preview),
            new Clothing(1, hat2, hat2, hat2Preview),
            new Clothing(1, hat2, hat2, hat2Preview)
        ],
        [
            new Clothing(1, shoes11, shoes12, shoes1Preview),
            new Clothing(1, shoes21, shoes22, shoes2Preview),
            new Clothing(1, shoes21, shoes22, shoes2Preview)
        ],
        [
            new Clothing(1, glasses1, glasses1, glasses1Preview),
            new Clothing(1, glasses2, glasses2, glasses2Preview),
            new Clothing(1, glasses3, glasses3, glasses3Preview)
        ],
        [
            new Clothing(1, hand1, hand1, hand1Preview),
            new Clothing(1, hand2, hand2, hand2Preview),
            new Clothing(1, hand2, hand2, hand2Preview)
        ]
    ];



    // Crabs
    crabListNoBot = [
        new Crab(1, height / 5, height / 5, 0.08 * width, 0.1 * height, crabImage11, crabImage12),
        new Crab(2, height / 5, 4 * height / 5, 0.08 * width, 0.1 * height, crabImage21, crabImage22)
    ]
    
    crabListBot = [
        new Crab(1, height / 5, height / 5, 0.08 * width, 0.1 * height, crabImage11, crabImage12),
        new CrabBot(3, 0.75*width, height/5, 0.08*width, 0.1*height, crabImage11, crabImage12)
    ];
    
    crabSound = new Audio('sound/crabSound.wav');
    crabSound.volume = 0.005;

    // Rocks
    rockList1 = [
        new Rock(0.73*width, 0.32*height, 0.1*width, 0.17*height, rockImage11, hitbox),
        new Rock(0.2*width, 0.60*height, 0.10*width, 0.13*height, rockImage12, hitbox),
        new Rock(0.18*width, 0.21*height, 0.12*width, 0.23*height, rockImage13, hitbox)
    ];

    rockList2 = [
        new Rock(0.73*width, 0.32*height, 0.1*width, 0.14*height, rockImage22, hitbox),
        new Rock(0.2*width, 0.70*height, 0.15*width, 0.23*height, rockImage21, hitbox)
    ];


    if(mapSelection==0) rockList=rockList1;
    else rockList=rockList2;


    // Zones
    zoneSize = 0.1*height;

    zones1 = [
        new Zone(0.05*width, 0.08*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.8*width, 0.13*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.8*width, 0.85*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.5*width, 0.5*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.4*width, 0.75*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2))
    ];
    zones2 = [
        new Zone(0.1*width, 0.1*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.8*width, 0.13*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(0.8*width, 0.85*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(width - width / 2, 0.4*height, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2)),
        new Zone(width - 6 * width / 8, height - 2 * height / 3, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 2))
    ];
    if(mapSelection==0)
        zones=zones1;
    else
        zones=zones2

    crabListBot.forEach((crab) => {
        zones.forEach(() => crab.itemGathering.push(0));
    });

    crabListNoBot.forEach((crab) => {
        zones.forEach(() => crab.itemGathering.push(0));
    });

    

    // Time
    setInterval(() => {
        totalSeconds++;
    }, 1000)
    setInterval(() => {
        addNewClothings();
    }, 15000)
    seagullSound = new Audio('sound/seagull.wav');
    seagullSound.volume = 0.005;
    seagullTime = getTimeOfNextSeagull(totalSeconds);

    seagull = new Seagull(width / 7, height / 7, seagullImage1, seagullImage2);

    // Button 
    homeButton = [
        new Button(0.6*width, 0.45*height, 0.25*width, 0.15*height, playB, 1), 
        new Button(0.62*width, 0.65*height, 0.21*width, 0.15*height, howB, 2)
    ]
    goalButton = [
        new Button(0.05*width, 0.42*height, 0.05*width, 0.1*height, arrowL, -1), 
        new Button(0.9*width, 0.42*height, 0.05*width, 0.1*height, arrowR, -2)
    ]
    choiceButton = [
        new Button(0.05*width, 0.42*height, 0.05*width, 0.1*height, arrowL, -1), 
        new Button(0.25*width, 0.5*height, 0.025*width, 0.05*height, arrowL, -6), 
        new Button(0.4*width, 0.5*height, 0.025*width, 0.05*height, arrowR, -7), 
        new Button(0.57*width, 0.5*height, 0.025*width, 0.05*height, arrowL, -8), 
        new Button(0.72*width, 0.5*height, 0.025*width, 0.05*height, arrowR, -9), 
        new Button(0.64*width, 0.8*height, 0.15*width, 0.1*height, bot, -3), 
        new Button(0.29*width, 0.8*height, 0.09*width, 0.1*height, ok1, -4),
        new Button(0.53*width, 0.8*height, 0.09*width, 0.1*height, ok1, -5)
    ]




    /* ----------------- EVENT ---------------- */
    canvas.addEventListener('keydown', (evt) => {
        keys[evt.key] = true;
        if (evt.key == "v") {
            if(crabList[0].cooldown==0){
                attack(0);
                splash();
                crabList[0].cooldown=cooldown;
            }
        }
        if (evt.key == "b") {
            if(crabList[1].cooldown==0){
                attack(1);
                splash();
                crabList[1].cooldown=cooldown;
                
        }   }
    })

    

    canvas.addEventListener('keyup', (evt) => {
        keys[evt.key] = false;
    })

    canvas.addEventListener("mousemove", setMousePosition, false);

    canvas.addEventListener('click', setClickPosition, false); 
    canvas.addEventListener('click', () => {
        musicGame.play();
        musicMenu.play();
    }, {once: true});
    /* ---------------------------------------- */
    
    

    window.requestAnimationFrame(gameLoop); // start the first frame request

}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp) {

    switch(state){
        default : // beginning of the game (-> case 0)
            buttonsPlay(); 
            buttonsHover(); 
            buttonsClick(); 
            if (menuState == 1) goGame() ; 
        break ; 

        case 1: // game 
            iter++;
            key();
            crabMovement();
            seagullActivity();
            winningCondition();
            break;

        case 2: // end of the game 
            break;
        
        case 3: // PAUSE 
            break;
    }

    draw();
    window.requestAnimationFrame(gameLoop); // keep requesting new frames
}

/* ----------------------------- DRAW FUNCTION ----------------------------- */
function draw() {
    context.clearRect(0, 0, width, height); // cleaning screen

    switch(state){
        default : // beginning of the game (-> case 0)
            drawPlay();
            break ; 

        case 1:
            
    
            drawBackground();
            if(alert)
                drawAlert();
            drawZone();
            drawCrabs();
            drawRocks();
            drawSeagull();
            drawTimer();
            break;

        case 2: // end of the game 
            drawBackground();
            drawVictoryScreen();
            break;
        
        case 3: // PAUSE 
            break;
    }
}


/* ----------------------------- OTHERS FUNCTIONS ----------------------------- */

function getTimeOfNextSeagull(seconds) {
    return seconds + random(5, 10);
}

function addNewClothings() {
    zones.forEach((zone) => {
        zone.object = random(0, 4) - 1;
        zone.type = random(0, 1);
    })
}

function seagullActivity() {
    if (seagullTime == totalSeconds) {
        crabList.forEach((crab) => {
            if (crab instanceof CrabBot) {
                crab.alert = true;
            }
        })
        seagullSound.play();
        alert = true;
    }

    if (seagullTime + random(4, 8) == totalSeconds && seagull.state == 0) {
        seagull.scout(crabList)
        alert = false;
    }

    switch (seagull.state) {

        case 1:
            seagull.spawn(width, height);
            break;

        case 2:
            seagull.move();
            let eatenCrab = seagull.eat();
            if (eatenCrab != undefined) {
                crabList.forEach((crab) => {
                    if (crab == eatenCrab) {
                        crab.won = -1;
                    }
                })
            }
            break;

        case 3:
            seagull.move();
            if (seagull.x < -width * 0.25 || seagull.x > width * 1.25 || seagull.y < -height * 0.25 || seagull.y > height * 1.25) {
                if (seagull.preys.length != 0) {
                    seagull.state = 1;
                } else {
                    crabList.forEach((crab) => {
                        if (crab instanceof CrabBot) {
                            crab.alert = false;
                        }
                    })
                    seagull.state = 0;
                    seagullTime = getTimeOfNextSeagull(totalSeconds);
                }
            }

            default:
                break;
    }
}

function key() {
    for (let key in keys) {
        if (keys[key]) {
            if (key == "z") {
                crabList[0].speedY -= 0.1;
            }
            if (key == "q") {
                crabList[0].speedX -= 0.1;
            }
            if (key == "s") {
                crabList[0].speedY += 0.1;
            }
            if (key == "d") {
                crabList[0].speedX += 0.1;
            }
            if(!botChoice){
                if (key == "i") {
                    crabList[1].speedY -= 0.1;
                }
                if (key == "j") {
                    crabList[1].speedX -= 0.1;
                }
                if (key == "k") {
                    crabList[1].speedY += 0.1;
                }
                if (key == "l") {
                    crabList[1].speedX += 0.1;
                }
            }   
        }
    }
}

function isInZone(crab) {
    crab.gathering = false;
    for (let i in zones) {
        if (zones[i].object != -1) {
            if (rectangleCollision(crab.x, crab.y, crab.width, crab.height, zones[i].x, zones[i].y, zones[i].width, zones[i].height)) {
                if (crab.itemGathering[i] > gatheringTime) {
                    crab.itemGathering[i] = 0;
                    switch (zones[i].object) {
                        case 0:
                            crab.hat = zones[i].type;
                            break;
                        case 1:
                            crab.shoes = zones[i].type;
                            break;
                        case 2:
                            crab.glasses = zones[i].type;
                            break;
                        case 3:
                            crab.hand = zones[i].type;
                            break;
                    }
                    zones[i].object = -1;
                } else {
                    crab.itemGathering[i]++;
                    crab.gathering = true;
                }
            } else {
                crab.itemGathering[i] = 0;
            }
        }
    }
}

function collisionRock(rock, crab) {
    if (crab.x < 0 || crab.x + crab.width > width) {
        crab.speedX = -crab.speedX;
        return true;
    }
    if (crab.y < 0 || crab.y + crab.height > height) {
        crab.speedY = -crab.speedY;
        return true;
    }

    if (rectangleCollision(rock.x, rock.y, rock.width * hitbox, rock.height * hitbox, crab.x, crab.y, crab.width, crab.height)) {

        if (rock.occupied == 0 || rock.occupied == crab.id) {
            rock.occupied = crab.id;
            crab.hidden = 1;
        } else if (rock.occupied != crab.id) {

            if (Math.abs(crab.x - rock.xHitbox) <= Math.abs(crab.y - rock.yHitbox)) {
                crab.speedY = -crab.speedY * 2.5;
            } else if (Math.abs(crab.x - rock.xHitbox) >= Math.abs(crab.y - rock.yHitbox)) {
                crab.speedX = -crab.speedX * 2.5;
            }
            return true;
        }
    }


    return false;
}

function attack(attacker) {
    crabList[attacker].attackFrame = 0;
    for (let i in crabList) {
        if(i != attacker){
            if (rectangleCollision(crabList[attacker].x, crabList[attacker].y, crabList[attacker].width, crabList[attacker].height,
                    crabList[i].x, crabList[i].y, crabList[i].width, crabList[i].height, )) {
                
                if (!(crabList[i].hat < 0 && crabList[i].shoes < 0 && crabList[i].glasses < 0 && crabList[i].hand < 0)) {
                    let lost = false;
                    while (!lost) {
                        switch (random(0, 3)) {
                            default:
                                if (crabList[i].hat > -1) {
                                    crabList[i].hat = -1;
                                    lost = true;
                                }
                                break;
                            case 1:
                                if (crabList[i].shoes > -1) {
                                    crabList[i].shoes = -1;
                                    lost = true;
                                }
                                break;
                            case 2:
                                if (crabList[i].glasses > -1) {
                                    crabList[i].glasses = -1;
                                    lost = true;
                                }
                                break;
                            case 3:
                                if (crabList[i].hand > -1) {
                                    crabList[i].hand = -1;
                                    lost = true;
                                }
                                break;
                        }
                    }
                }
            }
        }

    }
}


function crabMovement() {

    let oldX;
    let oldY;

    rockList.forEach((rock) => {
        rock.occupied = 0;
        crabList.forEach((crab) => {
            if (collisionRock(rock, crab)) {
                rock.occupied = crab.id;
            }
        });
    });
    crabList.forEach((crab) => {
        if (crab.won != -1) {
            oldX = crab.x;
            oldY = crab.y;
            if (crab instanceof CrabBot) {
                if (crab.alert) {
                    crab.scoutRock(rockList);
                } else {
                    crab.scoutClothing(zones);
                }
            }
            crab.move();
            crab.hidden = 0;

            rockList.forEach((rock) => {

                if (collisionRock(rock, crab)) {
                    crab.x = oldX;
                    crab.y = oldY;
                }
                isInZone(crab);
            })
        }

        if(crab.cooldown>0){
            crab.cooldown--;
        }
    })

}


function splash(){
    splashList[random(0,splashList.length-1)].cloneNode(true).play();
}

function pointsCalc(crab) {
    let sum = 0;
    if (crab.hat != -1) {
        sum += clothings[0][crab.hat].points;
    }
    if (crab.shoes != -1) {
        sum += clothings[1][crab.shoes].points;
    }
    if (crab.glasses != -1) {
        sum += clothings[2][crab.glasses].points;
    }
    if (crab.hand != -1) {
        sum += clothings[3][crab.hand].points;
    }
    return sum;
}

function winningCondition() {

    let nbDead = 0;
    crabList.forEach((crab) => {
        if (crab.won == -1) {
            nbDead++;
        }
        if (crab.hat != -1 && crab.shoes != -1 && crab.glasses != -1 && crab.hand != -1) {
            crab.won = 1;
            state = 2;
            winners.push(crab);
        }
    })
    if (nbDead >= crabList.length - 1 && seagull.preys.length == 0) {
        crabList.forEach((crab) => {
            if (crab.won != -1) {
                crab.won = 1;
                winners.push(crab);
            }
        })
        state = 2;
    }
    if (totalSeconds > 60) {
        state = 2;
        let maxScore = 0;
        crabList.forEach((crab) => {
            if (maxScore < pointsCalc(crab)) {
                winners = [crab];
                maxScore = pointsCalc(crab);
            } else if (maxScore == pointsCalc(crab)) {
                winners.push(crab);
            }
        })
    }

}

function drawTimer() {
    context.font = '60px Crab';
    if (totalSeconds % 60 > 50)
        context.fillText("0" + (60 - totalSeconds % 60), 20, 55);
    else
        context.fillText((60 - totalSeconds % 60), 20, 55);
}

function drawRocks() {
    rockList.forEach((rock) => {
        context.drawImage(rock.image, rock.x, rock.y, rock.width, rock.height);

    })

}

function drawZone() {
    for (let i in zones) {
        if (zones[i].object > -1) {
            context.drawImage(clothings[zones[i].object][zones[i].type].imagePreview, zones[i].x, zones[i].y, zones[i].width, zones[i].height);
        }
    }
}

function drawCrabs() {
    crabList.forEach((crab) => {
        if (crab.won != -1) {

            if (crab.attackFrame >= 0){
                context.drawImage(imageAttacks[Math.round(crab.attackFrame/8)], 
                crab.x+(1-animationSize*2.2)*crab.width/2, 
                crab.y+(1-animationSize+0.25)*crab.height, 
                crab.width*animationSize*2.2, 
                crab.height*animationSize
                );

                crab.attackFrame++;
            }
            if (crab.attackFrame > 7*8) {
                crab.attackFrame = -1;
            }

            if (iter % 25 > 12 && (Math.abs(crab.speedX) >= 0.25 || Math.abs(crab.speedY) >= 0.25)) {
                context.drawImage(crab.image2, crab.x, crab.y, crab.width, crab.height);
                
                if (crab.shoes != -1) {
                    context.drawImage(clothings[1][crab.shoes].image2, crab.x, crab.y, crab.width, crab.height);
                    
                }
                if(iter%25==24){
                    crabSound.cloneNode(true).play();
                }
            } else {
                context.drawImage(crab.image, crab.x, crab.y, crab.width, crab.height);
                if (crab.shoes != -1) {
                    context.drawImage(clothings[1][crab.shoes].image1, crab.x, crab.y, crab.width, crab.height);
                }
            }


            if (crab.hat != -1) {
                context.drawImage(clothings[0][crab.hat].active_image, crab.x, crab.y, crab.width, crab.height);
            }
            if (crab.shoes != -1) {
                context.drawImage(clothings[1][crab.shoes].active_image, crab.x, crab.y, crab.width, crab.height);
            }
            if (crab.glasses != -1) {
                context.drawImage(clothings[2][crab.glasses].active_image, crab.x, crab.y, crab.width, crab.height);
            }
            if (crab.hand != -1) {
                context.drawImage(clothings[3][crab.hand].active_image, crab.x, crab.y, crab.width, crab.height);
            }
        }
        if (crab.gathering) {
            context.drawImage(loadingRectangle, crab.x, crab.y - 0.2 * crab.height, crab.width, crab.height * 0.1);
            context.drawImage(loadingRectangleFill, crab.x, crab.y - 0.2 * crab.height, crab.width * max(crab.itemGathering) / gatheringTime, crab.height * 0.1);
            
        }
    })

}



function drawSeagull() {
    if (seagull.state >= 0) {
        if(iter%25>12){
            context.drawImage(seagull.image1, seagull.x, seagull.y, seagull.width, seagull.height);
        }
        else{
            context.drawImage(seagull.image2, seagull.x, seagull.y, seagull.width, seagull.height);
        }
    }
}

function drawVictoryScreen() {
    if (winners.length == 0) {
        winningMsg = "Tout le monde est mort, personne n'est kool sur cette plage...";
    } else if (winners.length == 1)
        winningMsg = "Le crabe " + winners[0].id + " gagne avec " + pointsCalc(winners[0]) + " points !";
    else {
        winningMsg = "Les crabes ";
        winners.forEach((winner) => {
            winningMsg += winner.id + ", ";
        });
        winningMsg = winningMsg.substring(0, winningMsg.length - 2);
        winningMsg += " gagnent avec " + pointsCalc(winners[0]) + " points !";
    }

    context.font = '60px Crab';
    context.fillText(winningMsg, 20, 55);
}

function drawBackground() {
    context.drawImage(background, 0, 0, width, height);
}

function drawAlert(){
    if(iter%200>100){
        context.drawImage(alertImage, 0, 0, width, height);
    }
}

function setMousePosition(evt) {
    mouseX = evt.clientX ;
    mouseY = evt.clientY ;
}

function setClickPosition(evt) {
    clickX = evt.x ;
    clickY = evt.y ;
}

function buttonsPlay(){
    switch(menuState){
        case 0 :
            background = beginning ; 
            buttonsSet = homeButton ; 
            break ; 
        case 1 :
            if (botChoice) background = playWithBot ; 
            else background = choice ; 
            buttonsSet = choiceButton ; 
            break ; 
        case 2 :
            background = goal ; 
            buttonsSet = goalButton ; 
            break ;
        case 3 :
            background = danger ; 
            buttonsSet = goalButton ; 
            break ; 
        case 4 :
            background = fight ; 
            buttonsSet = goalButton ; 
            break ; 
        case 5 :
            background = quick ; 
            buttonsSet = goalButton ; 
            break 
    }
}

function drawPlay(){
    drawBackground(); 
    buttonsSet.forEach((button) => { 
        if(!(menuState == 1 && botChoice)){
            context.drawImage(button.image, button.x, button.y, button.width, button.height);  
        }else if (!(button.go == -9 || button.go == -8)){
            context.drawImage(button.image, button.x, button.y, button.width, button.height);
        }
    });  
    if (menuState==1) drawCrabChoice() ; 
}

function buttonsHover(){
    buttonsSet.forEach((button) => { 
        if(mouseX > button.x && mouseX < button.x+button.width && mouseY > button.y && mouseY < button.y+button.height) {
            if(!(menuState == 1 && botChoice)){
                button.hover();   
            }else if (!(button.go == -5 || button.go == -3)){
                button.hover(); 
            }
        } 
        else {
            button.reset();  
        } 
    })
}

function buttonsClick(){
    buttonsSet.forEach((button) => { 
        if(clickX > button.x && clickX < button.x+button.width && clickY > button.y && clickY < button.y+button.height) {
            if(!(menuState == 1 && botChoice)){
                selectAction(button);    
            }else if (!(button.go == -5 || button.go == -3 || button.go == -9 || button.go == -8)){
                selectAction(button); 
            }
        } 
    })
    clickX = -1 ; 
    clickY = -1 ; 
} 

function drawCrabChoice(){
    context.drawImage(crab1, 0.263*width, 0.31*height, 0.15*width, 0.23*height);
    if (!botChoice) context.drawImage(crab2, 0.58*width, 0.31*height, 0.15*width, 0.23*height);
}

function goGame(){
    if (pret1 && pret2) {
        state = 1 ;
        musicGame.volume=0.6;
        musicMenu.volume=0;
        if(mapSelection==0){
            background = background1;
            rockList = rockList1;
            zones = zones1;
        }
        else{
            background = background2;
            rockList = rockList2;
            zones = zones2;
        }
        if(botChoice)
            crabList = crabListBot;
        else    
            crabList = crabListNoBot;
            
        crabList[0].image=tabCrabCoupleImages[crab1Choice][0];
        crabList[0].image2=tabCrabCoupleImages[crab1Choice][1];
        crabList[1].image=tabCrabCoupleImages[crab2Choice][0];
        crabList[1].image2=tabCrabCoupleImages[crab2Choice][1];
    }
}

function selectAction(button){
    switch(button.go){
        case -1 : // fleche changer de page gauche 
            if (menuState == 1){
                botChoice = false ; 
                crab1Choice = 1 ; 
                crab1Choice = 2 ; 
                pret1 = false ; 
                pret2 = false ; 
                choiceButton[6].image = ok1 ; 
                choiceButton[7].image = ok1 ; 
                choiceButton[5].image = bot ; 
            }
            if(menuState == 2) menuState = 0 ;  
            else menuState += button.go ;
            break ; 
        case -2 : // fleche changer de page droite
            if(menuState == 5) menuState = 0 ;  
             else menuState += 1 ; 
            break ;
        case -3 : // jouer contre le bot
            botChoice = !botChoice ;
            if (botChoice) {
                background = playWithBot ; 
                pret2 = true; 
                choiceButton[7].image = ok2 ; 
                choiceButton[5].image = bot2 ; 
            }
            else {
                pret2 = false; 
                background = choice ;
                choiceButton[5].image = bot ; 
                choiceButton[7].image = ok1 ; 
            }
            break ;
        case -4 : // crab1 prêt
            pret1 = !pret1; 
            if (pret1) button.image = ok2 ;
            else button.image = ok1 ; 
            break ;
        case -5 :  // crab2 prêt
            pret2 = !pret2; 
            if (pret2) button.image = ok2 ;
            else button.image = ok1 ; 
            break ;
        case -6 :  // fleche changer crab1 gauche
            crab1Choice = mod((crab1Choice-1),3) ;
            crab1 = tabCrabImage[crab1Choice]; 
            break ;
        case -7 :  // fleche changer crab1 droite 
            crab1Choice = mod((crab1Choice+1),3) ; 
            crab1 = tabCrabImage[crab1Choice]; 
            break ;
        case -8 :  // fleche changer crab2 gauche
            crab2Choice = mod((crab2Choice-1),3) ; 
            crab2 = tabCrabImage[crab2Choice]; 
            break ;
        case -9 :  // fleche changer crab2 droite 
            crab2Choice = mod((crab2Choice+1),3) ; 
            crab2 = tabCrabImage[crab2Choice]; 
            break ;
        default: // aller à la page
             menuState = button.go ; 
             break ; 
        } 
}