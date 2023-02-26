"use strict";

/* ---------------------- VARIABLES & IMAGES & CLASS ---------------------- */
let canvas, context, height, width;
let state = 0 ;
let zoneSize, zones ; 
let seagullTime, seagullSound, seagull;
let clothings ; 
let keys = {};
let rockCoords = [];
let rockList = [];
let crabList = [];
let hitbox = 0.8;
let totalSeconds = 1;
let gatheringTime = 2000;
let animationSize = 2;
let play_button, how_button;
let mouseX = 0, mouseY = 0;

let maxScore;
let winners = [];
let winningMsg = "";

let iter = 0;

const background = new Image();

const crabImage11 = new Image();
const crabImage12 = new Image();
const crabImage21 = new Image();
const crabImage22 = new Image();
const rockImage = new Image();
const seagullImage = new Image();


const hat1 = new Image();
const hat1Preview = new Image();
const hat2 = new Image();
const hat2Preview = new Image();

const shoes1Preview = new Image();
const shoes11 = new Image();
const shoes12 = new Image();
const shoes2Preview = new Image();
const shoes21 = new Image();
const shoes22 = new Image();

const glasses1 = new Image();
const glasses1Preview = new Image();
const glasses2 = new Image();
const glasses2Preview = new Image();

const hand1 = new Image();
const hand1Preview = new Image();
const hand2 = new Image();
const hand2Preview = new Image();

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

const beginning = new Image();
const quick = new Image();
const goal = new Image();
const fight = new Image();
const danger = new Image();
const choice = new Image();
const pause = new Image();

const playB = new Image();
const howB = new Image();




/* ------------------------------ INIT GAME ------------------------------ */
window.onload = init;

function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;

    background.src = 'img/background2.png';

    rockImage.src = 'img/rock.png';
    crabImage11.src = 'img/crab11.png';
    crabImage12.src = 'img/crab12.png';
    crabImage21.src = 'img/crab21.png';
    crabImage22.src = 'img/test22.png';
    seagullImage.src = 'img/seagull.png';


    hat1.src = 'img/hat.png';
    hat1Preview.src = 'img/hat1P.png';
    hat2.src = 'img/hat2.png';
    hat2Preview.src = 'img/hat2P.png';

    shoes11.src = 'img/shoes1.png';
    shoes1Preview.src = 'img/shoes1P.png';
    shoes12.src = 'img/shoes12.png';
    shoes21.src = 'img/shoes1.png';
    shoes2Preview.src = 'img/shoes1P.png';
    shoes22.src = 'img/shoes12.png';

    glasses1.src = 'img/glasses.png';
    glasses1Preview.src = 'img/glasses1P.png';
    glasses2.src = 'img/glasses2.png';
    glasses2Preview.src = 'img/glasses2P.png';

    hand1.src = 'img/hand1.png';
    hand1Preview.src = 'img/hand1P.png';
    hand2.src = 'img/hand1.png';
    hand2Preview.src = 'img/hand1P.png';

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

    playB.src = 'img/jouer.png';
    howB.src = 'img/comment.png';


    // Clothings
    clothings = [
        [
            new Clothing(20, hat1, hat1, hat1Preview),
            new Clothing(20, hat2, hat2, hat2Preview)
        ],
        [
            new Clothing(30, shoes11, shoes12, shoes1Preview),
            new Clothing(30, shoes21, shoes22, shoes2Preview)
        ],
        [
            new Clothing(10, glasses1, glasses1, glasses1Preview),
            new Clothing(10, glasses2, glasses2, glasses2Preview)
        ],
        [
            new Clothing(40, hand1, hand1, hand1Preview),
            new Clothing(40, hand2, hand2, hand2Preview)
        ]
    ];

    // Crabs
    crabList = [
        new Crab(1, height / 5, height / 5, 0.08 * width, 0.1 * height, crabImage11, crabImage12),
        new Crab(2, height / 5, 4 * height / 5, 0.08 * width, 0.1 * height, crabImage21, crabImage22)
        //new CrabBot(3, 0.75*width, height/5, 0.08*width, 0.1*height, crabImage11, crabImage12),
        //new CrabBot(4, 0.3*width, 0.80*height, 0.08*width, 0.1*height, crabImage11, crabImage12)
    ]



    // Rocks
    let rockSize = height / 10;

    rockList = [
        new Rock(height / 7, 3 * height / 5, rockSize, rockSize, rockImage, hitbox),
        new Rock(2 * height / 3, height / 2, rockSize, rockSize, rockImage, hitbox),
        new Rock(height / 8, height / 2, rockSize, rockSize, rockImage, hitbox),
        new Rock(5 * height / 7, 3 * height / 4, rockSize, rockSize, rockImage, hitbox)
    ];


    // Zones
    zoneSize = height / 10;
    zones = [
        new Zone(width - width / 5, height - height / 2, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 1)),
        new Zone(width - width / 5, height - 4 * height / 5, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 1)),
        new Zone(width - 4 * width / 5, height - 2 * height / 5, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 1)),
        new Zone(width - width / 2, height - 7 * height / 8, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 1)),
        new Zone(width - 6 * width / 8, height - 2 * height / 3, zoneSize, zoneSize, (random(0, 3) - 1), random(0, 1))
    ]

    crabList.forEach((crab) => {
        zones.forEach(() => crab.itemGathering.push(0));
    });


    // Time
    setInterval(() => {
        totalSeconds++;
    }, 1000)
    setInterval(() => {
        addNewClothings();
    }, 15000)
    seagullSound = new Audio('sound/seagull.mp3');
    seagullSound.volume = 0.005;
    seagullTime = getTimeOfNextSeagull(totalSeconds);

    seagull = new Seagull(width / 10, height / 10, seagullImage);

    // Button 
    play_button = new Button(0.6*width, 0.45*height, 0.25*width, 0.15*height, playB); 
    how_button = new Button(0.62*width, 0.65*height, 0.21*width, 0.15*height, howB); 




    /* ----------------- EVENT ---------------- */
    canvas.addEventListener('keydown', (evt) => {
        keys[evt.key] = true;
        if (evt.key == "v") {
            attack(0)
        }
        if (evt.key == "b") {
            attack(1)
        }
    })

    canvas.addEventListener('keyup', (evt) => {
        keys[evt.key] = false;
    })

    canvas.addEventListener("mousemove", setMousePosition, false);

    /* ---------------------------------------- */




/* ---------------------------------------- */

    window.requestAnimationFrame(gameLoop); // start the first frame request
}

/* ----------------------------- GAME LOOP ----------------------------- */
function gameLoop(timeStamp) {

    switch(state){
        default : // beginning of the game (-> case 0)
            buttonsPlay(); 
        break ; 

        case 1: // game 
            iter++;

            key();

            crabMovement();

            //seagullActivity();

            winningCondition();

            break;

        case 2: // end of the game 

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
            context.drawImage(beginning, 0, 0, width, height);
            context.drawImage(play_button.image, play_button.x, play_button.y, play_button.width, play_button.height);
            context.drawImage(how_button.image, how_button.x, how_button.y, how_button.width, how_button.height);
            break ; 
        case 1:
            drawBackground();

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

    }

    if (seagullTime + random(2, 4) == totalSeconds && seagull.state == 0) {
        seagull.scout(crabList)
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
    })

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
    context.font = '60px serif';
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
                crab.x+(1-animationSize)*crab.width/2, 
                crab.y+(1-animationSize)*crab.height/2, 
                crab.width*animationSize, 
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
                    context.drawImage(clothings[1][crab.shoes].image1, crab.x, crab.y, crab.width, crab.height);
                }
            } else {
                context.drawImage(crab.image, crab.x, crab.y, crab.width, crab.height);
                if (crab.shoes != -1) {
                    context.drawImage(clothings[1][crab.shoes].image2, crab.x, crab.y, crab.width, crab.height);
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
            context.drawImage(loadingRectangleFill, crab.x + 0.01 * crab.width, crab.y - 0.2 * crab.height + 0.01 * crab.height, (crab.width - 0.02 * crab.width) * max(crab.itemGathering) / gatheringTime, crab.height * 0.1 - 0.02 * crab.height);
            //console.log(max(crab.itemGathering))
        }
    })

}



function drawSeagull() {
    if (seagull.state >= 0) {
        context.drawImage(seagull.image, seagull.x, seagull.y, seagull.width, seagull.height);
        //context.drawImage(seagull.image, seagull.x, seagull.y, 50, 50);
    }
}

function drawVictoryScreen() {
    if (winners.length == 0) {
        winningMsg = "Tout le monde est mort, personne n'est kool sur cette plage...";
    } else if (winners.length == 1)
        winningMsg = "Le crabe n°" + winners[0].id + " a gagné avec " + pointsCalc(winners[0]) + " points !";
    else {
        winningMsg = "Les crabes n°";
        winners.forEach((winner) => {
            winningMsg += winner.id + ", ";
        });
        winningMsg = winningMsg.substring(0, winningMsg.length - 2);
        winningMsg += " gagnent avec " + pointsCalc(winners[0]) + " points !";
    }

    context.font = '60px serif';
    context.fillText(winningMsg, 20, 55);
}

function drawBackground() {
    context.drawImage(background, 0, 0, width, height);
}

function setMousePosition(e) {
    mouseX = e.clientX ;
    mouseY = e.clientY ;
}

function buttonsPlay(){  
    if(mouseX > play_button.x && mouseX < play_button.x+play_button.width && mouseY > play_button.y && mouseY < play_button.y+play_button.height) {
        play_button.x = play_button.baseX-0.01*width ; 
        play_button.y = play_button.baseY-0.01*height ; 
        play_button.width = play_button.baseWidth*1.1 ; 
        play_button.height = play_button.baseHeight*1.1 ;  
    } 
    else {
        play_button.reset();  
    } 
    if(mouseX > how_button.x && mouseX < how_button.x+how_button.width && mouseY > how_button.y && mouseY < how_button.y+how_button.height) {
        how_button.x = how_button.baseX-0.01*width ; 
        how_button.y = how_button.baseY-0.01*height ; 
        how_button.width = how_button.baseWidth*1.1 ; 
        how_button.height = how_button.baseHeight*1.1 ;  
    } 
    else {
        how_button.reset();  
    } 
}