class Cloud extends MoveableObject {
    x = 300;
    y = 20;
    height = 250;
    width = 600;


    constructor(imagePath, x, y) {
        super().loadImage(imagePath)
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        this.moveLeft(0.05, 1000/60);
    }



    
}