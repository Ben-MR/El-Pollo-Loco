class CollectableObjectsCoins extends MoveableObject{
    offset = {
        top: 5,
        left: 25,
        right: 25,
        bottom: 20
    }
    constructor(imagePath, x, y){
        super().loadImage(imagePath)
        this.x = x;
        this.y = y; 
    }
} 