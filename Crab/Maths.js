function norm(x,y){
    return Math.sqrt(x**2+y**2)
}

function normalize(directionX, directionY){
    let normOfD = norm(directionX,directionY);
    directionX/=normOfD;
    directionY/=normOfD;
    return [directionX,directionY];
}



function random(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rectangleCollision(x1, y1, w1, h1, x2, y2, w2, h2){
    return (x1 <= x2 + w2 && 
    x1 + w1 >= x2  &&
    y1 <= y2 + h2 &&
    y1 + h1 >= y2)
}

function max(array){
    let maxTemp = array[0];
    for(let i in array){
        if (array[i]>maxTemp)
            maxTemp=array[i]
    }
    return maxTemp;
}