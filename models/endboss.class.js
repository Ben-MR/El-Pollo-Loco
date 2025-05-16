class Endboss extends MoveableObject {
    y = 205;
    x= 6330;
    height = 230;
    width = 230;
    energy = 5;
    lastHit = 0;
    hurt = false;
    firtContact = false;
    i = 0;
    offset = {
        top: 40,
        left: 5,
        right: 5,
        bottom: 5
    }
    images_Alert = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    images_Walking = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png',

    ];
     images_Hurt = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    images_Dead = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png',
    ];
    images_Attack = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png',
    ];   
    

    constructor(world) {
        super(world); 
        this.world = world;
        this.bossMoveInterval = null;
        this.loadImage(this.images_Walking[0]); 
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_Alert);
        this.loadImages(this.images_Hurt);
        this.loadImages(this.images_Dead);
        this.loadImages(this.images_Attack);
        this.endBossAnimate();
        this.audio_boss_intro = new Audio('./audio/boss-intro2.mp3');
        this.audio_boss_intro.volume = 0.3;
        this.audio_victory = new Audio ('./audio/victory.mp3');
    }

    /**
     * Initializes and controls the animation loop for the end boss character.
     * Clears any existing interval before starting a new one and triggers the boss animation sequence.
     */
    endBossAnimate() {
        if (this.endbossAnimation) {
            clearInterval(this.endbossAnimation);
        }        
        this.endbossAnimation = setInterval(() => {
            this.bossAnimation()
        },150)
        intervals.push(this.endbossAnimation);    
    }

    /**
     * Controls the boss's animation logic based on internal states such as alert phase,
     * proximity to the character, and whether an intro or combat phase should be triggered.
     */
    bossAnimation() {
        if (this.i < 9) {
            this.playAnimation(this.images_Alert);
        }else {
            this.afterAlert();
        }
        this.i++;
        if (this.isBossContact()) {
            this.waitForBossIntro()                    
        }   
    }

    /**
     * Checks if the character has reached the boss area and the first contact hasn't occurred yet.
     * @returns {boolean} True if the boss encounter should begin.
     */
    isBossContact() {
        return this.world.character.x > 5960 && !this.firtContact;
    }

    /**
     * Triggers the boss intro sequence, disables player input, and resets animation counter.
     */
    waitForBossIntro() {
        this.bossIntro();
        this.firtContact = true;
        this.i = 0;  
    }
    
    /**
     * Determines the appropriate action for the boss to perform after the alert animation.
     */
    afterAlert() {
        if (this.bossCanAttack()){
           this.bossAttack();
        }else if (this.bossCanWalk()) {
            this.bossWalk();
        }else if (this.isBossHurt()) {
            this.bossIsHurt();
        }else if (this.energy === 0){
            this.bossIsDead();
        }
    }

    /**
     * Determines whether the boss should attack the player.
     * @returns {boolean} True if the boss is close enough and not hurt.
     */
    bossCanAttack() {
        return this.energy > 0 && this.firtContact && !this.hurt && (this.x - this.world.character.x < 100);
    }

    /**
     * Plays the boss's attack animation and stops movement.
     */
    bossAttack() {
        this.playAnimation(this.images_Attack);     
        this.stopMove();    
    }

    /**
     * Determines whether the boss should move (walk).
     * @returns {boolean} True if the boss is active and not hurt.
     */
    bossCanWalk() {
        return this.energy > 0  && !this.hurt && this.firtContact;
    }

    /**
     * Plays the walking animation, starts movement, and plays walking sound.
     * Sets the end of the level at the boss with bossEnd. 
     */
    bossWalk() {
        this.playAnimation(this.images_Walking);
        this.startMove();
        this.playSound();
        bossEnd = this.x;
    }

    /**
     * Checks whether the boss is currently in a hurt state.
     * @returns {boolean} True if the boss is hurt and still alive.
     */
    isBossHurt() {
        return this.energy > 0 && this.hurt;
    }

    /**
     * Plays the hurt animation and stops the boss's movement.
     */
    bossIsHurt() {
        this.playAnimation(this.images_Hurt);
        this.hurt = false;
        this.stopMove();
    }

    /**
     * Handles the boss death sequence including animation, stopping movement,
     * and transitioning to endgame logic.
     */
    bossIsDead() {
        this.playAnimation(this.images_Dead);
        this.stopMove();
        this.endGame();
    }

    /**
     * Starts the boss's movement in a fixed interval.
     * Prevents multiple intervals from being created.
     */
    startMove() {
        if (this.bossMoveInterval) return;     
            this.bossMoveInterval = setInterval(() => {
                this.x -= 2; 
        }, 1000 / 60); 
        intervals.push(this.bossMoveInterval)
    }

    /**
     * Stops the boss's movement by clearing its movement interval.
     */
    stopMove() {
        if (this.bossMoveInterval) {
            clearInterval(this.bossMoveInterval);
            this.bossMoveInterval = null;
        }
    }

    /**
     * Plays the boss's intro sound, disables player input temporarily,
     * and pauses the background music.
     */
    bossIntro() {        
        if (sound) {
            this.audio_boss_intro.play();
            music.pause(); 
        }
        keyboardOn = false;
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        setTimeout(() => {
            keyboardOn = true;
        }, 1500);               
    }

    /**
     * plays the boss sounds
     */
    playSound() {
        if (sound) {
            audio_chicken_angry.play();
            audio_boss_music.play();    
        }           
    }

    /**
     * Ends the game sequence after defeating the boss.
     * Pauses all boss and background sounds, triggers boss death handling,
     * and reveals the end screen overlay after a delay.
     */
    endGame() {
        audio_boss_music.pause();  
        music.pause(); 
        audio_chicken_angry.pause();
        this.stopGameBossDeath();
        setTimeout(() => {
            document.getElementById('overlay').classList.remove('d-none');
            audio_boss_music.pause(); 
        }, 3800);       
    }

    /**
     * Stops the boss's animation and movement after death.
     * Sets the `gameWon` flag to true and clears all running game intervals.
     */
    stopGameBossDeath() {
        setTimeout(() => {
            clearInterval(this.endbossAnimation);
            this.stopMove();
            this.world.gameWon = true;   
            if (sound) {
                this.audio_victory.play(); 
            }            
            endGameIntervals();                
        }, 2000);   
    }

    /**
     * Applies a hit to the boss by reducing its energy.
     * Prevents multiple hits within a short period by setting a cooldown.
     */
    chickenHit() {
        if (this.isHurt()) return;
        this.hurt = true;
        this.energy--;  
        if (this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the boss is still in a temporary invulnerable state (hurt cooldown).
     * @returns {boolean} True if the boss was hit less than 1 second ago.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;// Difference im ms
        timePassed = timePassed / 1000; //Uwandlung in Sekunden        
        return timePassed < 1;
    };       
}