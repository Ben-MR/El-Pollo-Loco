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
        left: 18,
        right: 35,
        bottom: 15
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
    charakterMoveAnimationMove;
    charakterAnimation;
    audio_jump = new Audio ('./audio/jump.mp3');
    audio_hit = new Audio ('./audio/character_hit2.mp3');
    audio_death = new Audio ('./audio/character_death.mp3');
    audio_gameOver = new Audio ('./audio/game-over.mp3');    


    constructor(world) {
        super(world).loadImage('./img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.images_jumping);
        this.loadImages(this.images_dead);
        this.loadImages(this.images_hurt);
        this.loadImages(this.images_idle);
        this.audio_snoring = new Audio ('./audio/snoring.mp3');
        this.audio_snoring.loop = true;
        this.audio_walking = new Audio ('./audio/walking.mp3')
        this.applyGravity();
        this.characterAnimate();
        this.timerFunction();
        this.world = world;
    }

    characterAnimate() {          
        this.timerFunction();
        this.charakterMoveAnimationMove = setInterval(() => this.moveCharacter() ,60/1000);
        intervals.push(this.charakterMoveAnimationMove);      
        this.charakterAnimation = setInterval(() => this.moveCharacterAnimation(), 100);
        intervals.push(this.charakterAnimation);
    }

    /**
     * Handles the main character movement logic for each frame.
     *
     * Checks input from the keyboard and calls the appropriate movement functions
     * (move right, move left, or jump). Also updates the
     * horizontal camera offset (`camera_x`) to follow the character
     */
    moveCharacter() {
        if (this.canMoveRight()) {
            this.characterMoveRight();
        };
        if (this.canMoveLeft()) {
            this.characterMoveLeft();
        };
        this.world.camera_x = -this.x + 100
        if (this.canJump()) {
             this.characterJump();
        }
    }

    /**
     * Checks whether the character is allowed to move to the right.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right and plays the walking sound-effect.
     * 
     * Also sets the character state to active (not idle) and triggers a movement timer.
     */
    characterMoveRight() {
        super.moveRight();
        if (sound && !this.isAboveGround()) {
            this.audio_walking.play();
        }
        this.isIdle = false;
        this.timerFunction();
    }

    /**
     * Checks whether the character is allowed to move to the left.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 120;
    }

     /**
     * Moves the character to the left and plays the walking sound-effect.
     * 
     * Also sets the character state to active (not idle) and triggers a movement timer.
     */
    characterMoveLeft() {
        this.x -= this.speed;   
        if (sound && !this.isAboveGround()) {
            this.audio_walking.play();
        }
        this.otherDirection = true;
        this.isIdle = false;
        this.timerFunction();
    }

    /**
     * Checks whether the character is allowed to jump.
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Makes the character jump and plays jump sound if enabled.
     *
     * Also sets the jump animation flag, marks the character as active,
     * and triggers a movement timer.
     */
    characterJump() {
        this.jumpAnima = true;
        this.jump();
        this.isIdle = false;
        this.timerFunction();
        if (sound) {
            this.audio_jump.play(); 
        }   
    }

    /**
     * Determines and plays the correct animation based on the character's current state.
     *
     * Prioritizes the following states in order:
     * 1. Dead
     * 2. Hurt
     * 3. Jumping
     * 4. Idle or Walking
     */
    moveCharacterAnimation () {
        if (this.isDead()) {
            this.characterDied ();
        } else if (this.isHurt()) {
            this.characterIsHurt();
        } else if (this.onJump()) {
            this.characterOnJump();
        } else {
            this.characterIsIdle();
        }
    }

    /**
     * Plays the death animation and sound effect.
     *
     * This function is triggered when the character has died.
     */
    characterDied () {
        if (sound) {
            this.audio_death.play();
        }                    
        this.characterDead();
    }

    /**
     * Plays the hurt animation and associated sound (only once per hurt event).
     *
     * Prevents replaying the hurt sound until the character recovers.
     */
    characterIsHurt() {
        this.playAnimation(this.images_hurt);   
        if (!this.audioPlayedDuringHurt) {
            if (sound) {
                this.audio_hit.play(); 
            }                    
            this.audioPlayedDuringHurt = true;
        }    
    }

    /**
     * Checks if the character is currently in a jump animation while in the air.
     */
    onJump() {
        return this.isAboveGround() && this.jumpAnima === true
    }

    /**
     * Plays the jump animation and resets hurt sound flag.
     */
    characterOnJump() {
        this.jumpAnimation();
        this.audioPlayedDuringHurt = false; 
    }

    /**
     * Plays the idle or walking animation based on movement state.
     *
     * Also plays a snoring sound if the character is idle and the game is paused.
     */ 
    characterIsIdle() {
        if (this.isIdle) {
            this.playAnimation(this.images_idle);
            if (sound && paused) {
                this.audio_snoring.play();
            }                    
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.imagesWalking);
        }
        this.audioPlayedDuringHurt = false;
    }

    /**
     * Starts or resets a timer that will set the character to idle after 10 seconds of inactivity.
     *
     * Also pauses the snoring sound when activity resumes.
     */
    timerFunction() {
        this.audio_snoring.pause();
        if (this.idleTimeout) {
            clearTimeout(this.idleTimeout);
        }
        this.isIdle = false;
        this.idleTimeout = setTimeout(() => {
            this.isIdle = true;
        }, 10000);
    }

    /**
     * Animates the character jump by cycling through jump image frames.
     *
     * Resets the jump animation state once the last frame is reached.
     */
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

    /**
     * Handles the character's death by playing the death animation,
     * stopping all game intervals, and triggering the end screen sequence.
     */
    characterDead() {
        this.playAnimation(this.images_dead); 
        endGameIntervals();
        paused = false;
        this.endScreen();    
    }  

    /**
     * Initiates the end screen sequence after the character dies.
     *
     * - Waits 1 second, then begins moving the character downward.
     * - Stops all game intervals again for safety.
     * - Shows the game over overlay after a short delay.
     */
    endScreen() {
        setTimeout(() => {
            setInterval(() => {
                this.y += 10;                
            }, 50);     
            endGameIntervals();        
        }, 1000);
        this.stopGameDeath();
        setTimeout(() => {
            document.getElementById('overlay').classList.remove('d-none');            
        }, 4800); 
    }    

    /**
     * Stops the game logic and plays the game over sound after a delay.
     *
     * - Marks the game as over.
     * - Pauses background and boss music and sets to zero.
     * - Plays the game over sound if sound is enabled.
     */
    stopGameDeath() {
        setTimeout(() => {
            this.world.gameOver = true;
            music.pause();  
            music.currentTime = 0;
            audio_boss_music.pause(); 
            audio_boss_music.currentTime = 0;
            audio_chicken_angry.pause(); 
            if (sound) {
                this.audio_gameOver.play();
            }            
        }, 2800);   
    }
}