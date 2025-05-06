class CollectableObjectsBottles extends MoveableObject{
    width = 120;
    height = 120;
    y = 310;
    constructor(imagePath, x){
        super().loadImage(imagePath)
        this.x = x;
        
    }
} 