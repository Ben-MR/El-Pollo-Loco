class Character extends MoveableObject {
    height = 260;
    width = 140;
    y = 175;
    speed = 2.0;
    imagesWalking = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png',
    ];
    world;
    

    constructor() {
        super().loadImage('../img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.animate();
    }

    animate() {          
        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;   
                this.otherDirection = false;
            };
        },60/1000);

        setInterval(() => {
            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;   
                this.otherDirection = true;
            };
            this.world.camera_x = -this.x
        },60/1000);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                         
                let i = this.currentImage % this.imagesWalking.length;
                let path = this.imagesWalking[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 50);
    }

    jump() {

    }
} 