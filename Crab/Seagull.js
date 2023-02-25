class Seagull{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.image;
        this.directionX;
        this.directionY;
        this.hunting=0;
    }

    hunt(crab){
        this.hunting=1;
        this.directionX=crab.x-this.x
        this.directionY=crab.y-this.y
        this.normalize();
    }

    move(){
        this.x += this.directionX;
        this.y = this.directionY
    }

    normalize(){
        let norm = Math.sqrt(this.directionX**2+this.directionY**2)
        this.directionX/=norm;
        this.directionY/=norm;
    }
}