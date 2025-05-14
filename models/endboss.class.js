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
        top: 10,
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
    }

    endBossAnimate() {
        if (this.endbossAnimation) {
            clearInterval(this.endbossAnimation);
        }        
        this.endbossAnimation = setInterval(() => {
            this.bossAnimation()
        },150)
        intervals.push(this.endbossAnimation);    
    }

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

    isBossContact() {
        return this.world.character.x > 5960 && !this.firtContact;
    }

    waitForBossIntro() {
        this.bossIntro();
        this.firtContact = true;
        this.i = 0;  
    }
    
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

    bossCanAttack() {
        return this.energy > 0 && this.firtContact && !this.hurt && (this.x - this.world.character.x < 100);
    }

    bossAttack() {
        this.playAnimation(this.images_Attack);     
        this.stopMove();    
    }

    bossCanWalk() {
        return this.energy > 0  && !this.hurt && this.firtContact;
    }

    bossWalk() {
        this.playAnimation(this.images_Walking);
        this.startMove();
        this.playSound();
    }

    isBossHurt() {
        return this.energy > 0 && this.hurt;
    }

    bossIsHurt() {
        this.playAnimation(this.images_Hurt);
        this.hurt = false;
        this.stopMove();
    }

    bossIsDead() {
        this.playAnimation(this.images_Dead);
        this.stopMove();
        this.endGame();
    }

    startMove() {
        if (this.bossMoveInterval) return;     
            this.bossMoveInterval = setInterval(() => {
                this.x -= 2; 
        }, 1000 / 60); 
        intervals.push(this.bossMoveInterval)
    }

    stopMove() {
        if (this.bossMoveInterval) {
            clearInterval(this.bossMoveInterval);
            this.bossMoveInterval = null;
        }
    }

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

    playSound() {
        if (sound) {
            audio_chicken_angry.play();
            audio_boss_music.play();    
        }           
    }

    endGame() {
        audio_boss_music.pause();  
        music.pause(); 
        audio_chicken_angry.pause();
        this.stopGameBossDeath();
        setTimeout(() => {
            document.getElementById('overlay').classList.remove('d-none');
            audio_boss_music.pause(); 
        }, 4800);       
    }

    stopGameBossDeath() {
        setTimeout(() => {
            clearInterval(this.endbossAnimation);
            this.stopMove();
            this.world.gameWon = true;    
            endGameIntervals();                
        }, 2000);   
    }

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

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;// Difference im ms
        timePassed = timePassed / 1000; //Uwandlung in Sekunden        
        return timePassed < 1;
    };       
}