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

    images_jumping = [
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-33.png',
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png',
    ]
    world;
    

    constructor() {
        super().loadImage('../img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.images_jumping);
        this.applyGravity();
        this.animate();
    }

    animate() {          
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            };
        },60/1000);

        setInterval(() => {
            if (this.world.keyboard.LEFT && this.x > 120 ) {
                this.x -= this.speed;   
                this.otherDirection = true;
            };
            this.world.camera_x = -this.x + 100
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        },60/1000);

        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.images_jumping);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                         
                    this .playAnimation(this.imagesWalking);
                } 
            } 
        },  125);         

       
    }

    
    

}