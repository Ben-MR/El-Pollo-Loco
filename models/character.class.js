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
            if (this.world.keyboard.RIGHT && this.x <2250) {
                this.x += this.speed;   
                this.otherDirection = false;
            };
        },60/1000);

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 120) {
                this.x -= this.speed;   
                this.otherDirection = true;
            };
            this.world.camera_x = -this.x + 100;
        },60/1000);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                         
                this.playAnimation(this.imagesWalking)
            }
        }, 50);
    }

    jump() {

    }
} 