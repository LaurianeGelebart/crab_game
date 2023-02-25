class Crab{
    constructor(id, x, y){
        this.id=id
        this.x=x;
        this.y=y;
        this.image;
        this.hat=-1;
        this.shoes=-1;
        this.glasses=-1;
        this.speedX=0;
        this.speedY=0;
        this.hidden=0;
        this.won=0;
    }

    move(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.speedX/=1.03;
        this.speedY/=1.03;
    }
}