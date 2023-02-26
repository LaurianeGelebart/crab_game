class Rock{
    constructor(x, y, width, height, image, hitbox){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.occupied=0;
        this.image=image;
        this.xHitbox = x+(1-hitbox)*width/2;
        this.yHitbox = y+(1-hitbox)*height/2;
    }
}