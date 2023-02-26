class Crab{
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
        this.speedX=0;
        this.speedY=0;
        this.hidden=0;
        this.won=0;
        this.width=width;
        this.height=height;
        this.itemGathering = []
        this.gathering = false;
        this.attack = false;
        this.attackFrame = -1;
    }

    move(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        this.speedX/=1.03;
        this.speedY/=1.03;
        if (Math.abs(this.speedX) < 0.001)
            this.speedX=0;
        if (Math.abs(this.speedY) < 0.001)
            this.speedY=0;
    }
}