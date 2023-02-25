class Seagull{
    constructor(image){
        this.x = 0;
        this.y = 0;
        this.image = image;
        this.directionX;
        this.directionY;
        this.hunting=-1;
    }

    hunt(crabList){
        for(let i in crabList){
            this.hunting=i;
            this.directionX=crab.x-this.x
            this.directionY=crab.y-this.y
            this.normalize();
        }
        
    }

    move(){
        this.x += this.directionX;
        this.y = this.directionY
    }

    normalize(){
        let norm = this.norm(directionX,directionY);
        this.directionX/=norm;
        this.directionY/=norm;
    }

    computeNorm(x,y){
        return Math.sqrt(this.x**2+this.y**2)
    }
}