class CollectableObjectsCoins extends MoveableObject{
    offset = {
        top: 55,
        left: 35,
        right: 35,
        bottom: 55
    }
    constructor(imagePath, x, y){
        super().loadImage(imagePath)
        this.x = x;
        this.y = y; 
    }
} 