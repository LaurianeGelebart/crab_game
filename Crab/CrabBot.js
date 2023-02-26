class CrabBot{
    constructor(id, x, y, width, height, image, image2){
        this.id=id
        this.x=x;
        this.y=y;
        this.image = image;
        this.image2 = image2;
        this.hat=-1;
        this.shoes=-1;
        this.glasses=-1;
        this.hand=-1;
        this.speedX=1;
        this.speedY=1;
        this.hidden=0;
        this.won=0;
        this.width=width;
        this.height=height;
        this.itemGathering = []
        this.gathering = false;
        this.attack = false;
        this.attackFrame = -1;
        this.alert = false;
        this.name;
    }

    move(){
        if(this.alert && this.hidden){
            //this.speedX = 0;
            //this.speedY = 0;
        }
        else if (this.gathering && !this.alert){
        }
        else if (this.alert){
            this.speedX += 0.2;
            this.speedY += 0.2;
        }
        else{
            this.speedX += 0.1;
            this.speedY += 0.1;
        }
        this.speedX/=1.06;
        this.speedY/=1.06;
        this.x+=this.speedX*this.directionX;
        this.y+=this.speedY*this.directionY;
        if (Math.abs(this.speedX) < 0.001)
            this.speedX=0;
        if (Math.abs(this.speedY) < 0.001)
            this.speedY=0;
    }

    
    scoutRock(rockList){
        if(!this.hidden){
            let minDist = 999999;
            let tempDist;
            let closestRock;
            for(let i in rockList){
                tempDist = distance(this.x+this.width/2, this.y+this.height/2, rockList[i].x+rockList[i].width/2, rockList[i].y+rockList[i].height/2)
                if (tempDist < minDist && (rockList[i].occupied==0 || rockList[i].occupied==this.id)){
                    minDist=tempDist;
                    closestRock=i;
                }
            }
            this.target(rockList[closestRock].x, rockList[closestRock].y);
        }
    }

    scoutClothing(zones){
        if(!this.gathering){
            let minDist = 999999;
            let tempDist;
            let closestCloth;
            for(let i in zones){
                tempDist = distance(this.x+this.width/2, this.y+this.height/2, zones[i].x+zones[i].width/2, zones[i].y+zones[i].height/2)
                if (tempDist < minDist && zones[i].object != -1){
                    minDist=tempDist;
                    closestCloth=i;
                }
            }
            if(closestCloth != undefined)
                this.target(zones[closestCloth].x, zones[closestCloth].y);
            else{
                this.speedX=0;
                this.speedY=0;
            }
        }
    }

    scoutRivals(crabList, crabBotList){
        let minDist = 999999;
        let tempDist;
        let closestRival;
        let bot = false;
        for(let i in crabList){
            tempDist = distance(this.x+this.width/2, this.y+this.height/2, crabList[i].x+crabList[i].width/2, crabList[i].y+crabList[i].height/2)
            if (tempDist < minDist && (crabList[i].occupied==0 || crabList[i].occupied==this.id)){
                minDist=tempDist;
                closestRival=i;
            }
        }
        for(let i in crabBotList){
            tempDist = distance(this.x+this.width/2, this.y+this.height/2, crabList[i].x+crabList[i].width/2, crabList[i].y+crabList[i].height/2)
            if (tempDist < minDist && (crabList[i].occupied==0 || crabList[i].occupied==this.id)){
                minDist=tempDist;
                closestRival=i;
                bot = true;
            }
        }
        if(bot)
            this.target(crabList[closestRival].x, crabList[closestRival].y);
        else
            this.target(crabList[closestRival].x, crabList[closestRival].y);
    }

    target(x,y){
        this.directionX = x - (this.x + this.width/2);
        this.directionY = y - (this.y + this.height/2);
        let directions = normalize(this.directionX,this.directionY);
        this.directionX = directions[0];
        this.directionY = directions[1];
    }
}
