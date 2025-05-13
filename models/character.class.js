class Character extends MoveableObject {
    height = 260;
    width = 140;
    y = 175; 
    speed = 2.0;
    audioPlayedDuringHurt = false;
    jumpAnima = true;
    jumpFrame = 0;
    idleTimeout = null;    
    isIdle = false; 
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
        './img/2_character_pepe/2_walk/W-21.png',
    ];
    images_idle = [
        './img/2_character_pepe/1_idle/idle/I-1.png',
        './img/2_character_pepe/1_idle/idle/I-2.png',
        './img/2_character_pepe/1_idle/idle/I-3.png',
        './img/2_character_pepe/1_idle/idle/I-4.png',
        './img/2_character_pepe/1_idle/idle/I-5.png',
        './img/2_character_pepe/1_idle/idle/I-6.png',
        './img/2_character_pepe/1_idle/idle/I-7.png',
        './img/2_character_pepe/1_idle/idle/I-8.png',
        './img/2_character_pepe/1_idle/idle/I-9.png',
        './img/2_character_pepe/1_idle/idle/I-10.png',
        './img/2_character_pepe/1_idle/long_idle/I-11.png',
        './img/2_character_pepe/1_idle/long_idle/I-12.png',
        './img/2_character_pepe/1_idle/long_idle/I-13.png',
        './img/2_character_pepe/1_idle/long_idle/I-14.png',
        './img/2_character_pepe/1_idle/long_idle/I-15.png',
        './img/2_character_pepe/1_idle/long_idle/I-16.png',
        './img/2_character_pepe/1_idle/long_idle/I-17.png',
        './img/2_character_pepe/1_idle/long_idle/I-18.png',
        './img/2_character_pepe/1_idle/long_idle/I-19.png',
        './img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]
    world;
    audio_jump = new Audio ('./audio/jump.mp3');
    audio_hit = new Audio ('./audio/character_hit2.mp3');
    audio_death = new Audio ('./audio/character_death.mp3');
    audio_gameOver = new Audio ('./audio/game-over.mp3');

    constructor(world) {
        super().loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.applyGravity();
        this.characterAnimate();
        this.timerFunction();
        this.world = world;
    }



    characterAnimate() {          
        this.timerFunction();
        this.charakterMoveAnimationMove = setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.isIdle = false;
                this.timerFunction();
            };
            if (this.world.keyboard.LEFT && this.x > 120 ) {
                this.x -= this.speed;   
                this.otherDirection = true;
                this.isIdle = false;
                this.timerFunction();
            };
            this.world.camera_x = -this.x + 100
            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jumpAnima = true;
                this.jump();
                this.isIdle = false;
                this.timerFunction();
                if (sound) {
                    this.audio_jump.play(); 
                }                
            }
        },60/1000);

        this.charakterAnimation = setInterval(() => {
            if (this.isDead()) {
                this.audio_death.play();    
                this.characterDead();
            } else if (this.isHurt()) {
                this.playAnimation(this.images_hurt);   
                if (!this.audioPlayedDuringHurt) {
                    if (sound) {
                        this.audio_hit.play(); 
                    }                    
                    this.audioPlayedDuringHurt = true;
                }        
            } else if (this.isAboveGround() && this.jumpAnima === true) {
                this.jumpAnimation();
                this.audioPlayedDuringHurt = false; 
            } else {
                if (this.isIdle) {
                    this.playAnimation(this.images_idle);
                } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.imagesWalking);
                }
                this.audioPlayedDuringHurt = false;
}
        }, 100);
    }

    timerFunction() {
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
        }

        this.isIdle = false;

        this.idleTimeout = setTimeout(() => {
            this.isIdle = true;
        }, 5000);
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
        this.endScreen();    
    }  

    endScreen() {
        setTimeout(() => {
            setInterval(() => {
                this.y += 10;                
            }, 50);             
        }, 1000);
        setTimeout(() => {
            this.world.gameOver = true;
            music.pause();  
            this.audio_gameOver.play();
        }, 2800);    
        setTimeout(() => {
            document.getElementById('overlay').classList.remove('d-none');            
        }, 4800); 
    }
    

}