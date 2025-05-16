class CollectableObjectsBottles extends MoveableObject{
    width = 120;
    height = 120;
    y = 310;
    offset = {
        top: 25,
        left: 55,
        right: 25,
        bottom: 1
    }
    constructor(imagePath, x){
        super().loadImage(imagePath)
        this.x = x;        
    }
} 