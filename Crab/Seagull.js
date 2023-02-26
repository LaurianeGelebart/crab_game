class Seagull{
    constructor(width,height,image){
        this.x = 0;
        this.y = 0;
        this.width=width;
        this.height = height;
        this.image = image;
        this.directionX=0;
        this.directionY=0;
        this.preys=[];
        this.state=0
        
    }

    spawn(width,height){
        
        switch (random(0,1)){
            case 0 :
                this.x = -this.width;
                break;
            case 1 :
                this.x = width+this.width;
                break;
        }
        this.y = random(-this.height,height);
        this.target(-this.width,random(0,height));

        if(this.preys.length != 0)
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
                this.target(this.preys[0].x + this.preys[0].width,this.preys[0].y + this.preys[0].height);
            }
        }
        
        this.x += 5*this.directionX;
        this.y += 5*this.directionY;

        
    }

    eat(){
        if(this.preys.length != 0){
            let crab = this.preys[0];
            if (rectangleCollision(seagull.x, seagull.y, seagull.width, seagull.height, crab.x, crab.y, crab.width, crab.height)){
                this.state = 3;
                return this.preys.shift();
                
            }
        }
            
    }

    target(x,y){
        this.directionX = x - (this.x + this.width/2);
        this.directionY = y - (this.y + this.height/2);
        let directions = normalize(this.directionX,this.directionY);
        this.directionX = directions[0];
        this.directionY = directions[1];
    }

    
}

