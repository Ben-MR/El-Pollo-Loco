class Character extends MoveableObject {
    height = 260;
    width = 140;
    y = 175; 
    speed = 2.0;
    audioPlayedDuringHurt = false;
    jumpAnima = true;
    jumpFrame = 0;
    offset = {
        top: 110,
        left: 15,
        right: 35,
        bottom: 5
    }
    imagesWalking = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png',
    ];
    images_jumping = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png',
    ];
    images_dead = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png',
    ];
    images_hurt = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png',
    ];
    world;
    audio_jump = new Audio ('./audio/jump.mp3');
    audio_hit = new Audio ('./audio/character_hit2.mp3');
    audio_death = new Audio ('./audio/character_death.mp3');
    

    constructor() {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.applyGravity();
        this.animate();
    }

    animate() {          
        this.charakterMoveAnimation = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            };
            if (this.world.keyboard.LEFT && this.x > 120 ) {
                this.x -= this.speed;   
                this.otherDirection = true;
            };
            this.world.camera_x = -this.x + 100
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jumpAnima = true;
                this.jump();
                this.audio_jump.play(); 
            }
        },60/1000);

        this.charakterAnimation = setInterval(() => {
            if (this.isDead()) {
                this.audio_death.play();    
                this.characterDead();
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);   
                if (!this.audioPlayedDuringHurt) {
                    this.audio_hit.play(); 
                    this.audioPlayedDuringHurt = true;
                }        
            } else if (this.isAboveGround() && this.jumpAnima === true) {
                this.jumpAnimation();
                this.audioPlayedDuringHurt = false; 
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {                         
                    this.playAnimation(this.imagesWalking);
                }
                this.audioPlayedDuringHurt = false;  
            }
        }, 100);
    }

    jumpAnimation() {
        if(this.jumpFrame < (this.images_jumping.length - 1)){
            let image = this.images_jumping[this.jumpFrame];
            this.img = this.imageCache[image];
            this.jumpFrame++;
        }else{
            this.jumpAnima = false;
            this.jumpFrame = 0;
        }
    }

    characterDead() {
        this.playAnimation(this.images_dead); 
        clearInterval(this.charakterAnimation);
        clearInterval(this.charakterMoveAnimation);
        setTimeout(() => {
            setInterval(() => {
                this.y += 10;                
            }, 50);             
        }, 1000);
        setTimeout(() => {
            this.world.gameOver = true;
        }, 2800);       
    }



    
    

}