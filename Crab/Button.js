class Button{
    constructor(x,y,width,height,image, go){
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
        this.go = go; 
    }

    reset(){
        this.x=this.baseX;
        this.y=this.baseY;
        this.width=this.baseWidth;
        this.height=this.baseHeight;
    }

    hover(){
        this.x = this.baseX-0.01*width ; 
        this.y = this.baseY-0.01*height ; 
        this.width = this.baseWidth*1.1 ; 
        this.height = this.baseHeight*1.1 ;  
    }
}