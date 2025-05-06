class CollectableObjectsCoins extends MoveableObject{
    constructor(imagePath, x, y){
        super().loadImage(imagePath)
        this.x = x;
        this.y = y; 
    }
} 