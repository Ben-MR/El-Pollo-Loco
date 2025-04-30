class Chicken extends MoveableObject {
    y = 369;
    height = 60;
    width = 60;
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
   

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.loadImages(this.imagesWalking);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking)
        }, 50);
        this.moveLeft((0.2 + Math.random() * 0.25), 1000/60);   
    }
} 