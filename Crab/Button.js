class Button{
    constructor(x,y,width,height,image){
        this.x=x;
        this.y=y;
        this.image = image;
        this.width=width;
        this.height=height;
        this.sizeButton = 1 ;
        this.baseX = x ; 
        this.baseY = y ; 
        this.baseWidth = width ; 
        this.baseHeight = height ; 
    }

    reset(){
        this.x=this.baseX;
        this.y=this.baseY;
        this.width=this.baseWidth;
        this.height=this.baseHeight;
    }
}