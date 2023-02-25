class Seagull{
    constructor(width,heigth,image){
        this.x = 0;
        this.y = 0;
        this.width=width;
        this.heigth = heigth;
        this.image = image;
        this.directionX=0;
        this.directionY=0;
        this.preys=[];
        this.state=0
        
    }

    spawn(width,heigth){
        
        switch (random(0,1)){
            case 0 :
                this.x = -this.width;
                break;
            case 1 :
                this.x = width+this.width;
                break;
        }
        this.y = random(-this.heigth,height);
        this.target(-this.width,random(0,heigth));

        if(this.preys.height != 0)
            this.state=2;
        else
            this.state=3;
    }

    scout(crabList){
        crabList.forEach((crab) => {
            if(!crab.hidden && crab.won!=-1)
                this.preys.push(crab);
        });
        this.state=1;
        
    }

    move(){
        if(this.state==2){
            if(this.preys.length != 0){
                this.target(this.preys[0].x + this.preys[0].width,this.preys[0].y + this.preys[0].length);
            }
        }
        
        this.x += 5*this.directionX;
        this.y += 5*this.directionY;

        
    }

    eat(){
        if(this.preys.length != 0){
            let crab = this.preys[0];
            if (rectangleCollision(seagull.x, seagull.y, seagull.size, seagull.size, crab.x, crab.y, crab.size, crab.size)){
                this.state = 3;
                return this.preys.shift();
                
            }
        }
            
    }

    target(x,y){
        this.directionX = x - (this.x + seagull.size);
        this.directionY = y - (this.y + seagull.size);
        let directions = normalize(this.directionX,this.directionY);
        this.directionX = directions[0];
        this.directionY = directions[1];
    }

    
}

