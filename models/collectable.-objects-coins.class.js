class CollectableObjectsCoins extends MoveableObject{
    offset = {
        top: 45,
        left: 25,
        right: 25,
        bottom: 45
    }
    constructor(imagePath, x, y){
        super().loadImage(imagePath)
        this.x = x;
        this.y = y; 
    }
} 