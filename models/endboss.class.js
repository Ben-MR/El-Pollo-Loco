class Endboss extends MoveableObject {
    y = 205;
    x= 2100;
    height = 230;
    width = 230;
    energy = 3;
    lastHit = 0;
    hurt = false;
    firtContact = false;
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
        this.moveInterval = null;
        this.loadImage(this.images_Walking[0]); 
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_Alert);
        this.loadImages(this.images_Hurt);
        this.loadImages(this.images_Dead);
        this.loadImages(this.images_Attack);
        this.endBossAnimate();
        this.audio_chicken_angry = new Audio ('./audio/angry-chicken.mp3');
        this.audio_boss_music = new Audio('./audio/music_fast.mp3');
        this.audio_boss_music.volume = 0.5;
        this.audio_boss_intro = new Audio('./audio/boss-intro2.mp3');
        this.audio_boss_intro.volume = 0.3;
    }

    endBossAnimate() {
        if (this.endbossAnimation) {
            clearInterval(this.endbossAnimation);
        }
        let i = 0
        this.endbossAnimation = setInterval(() => {
            if (i < 9) {
                this.playAnimation(this.images_Alert);
            }else {
                if (this.energy > 0 && this.firtContact && !this.hurt && (this.x - this.world.character.x < 170)){
                    this.playAnimation(this.images_Attack);     
                    this.stopMove();               
                }else if (this.energy > 0  && !this.hurt && this.firtContact) {
                    this.playAnimation(this.images_Walking);
                    this.startMove();
                    this.playSound();
                }else if (this.energy > 0 && this.hurt) {
                    this.playAnimation(this.images_Hurt);
                    this.hurt = false;
                    this.stopMove();
                }else if (this.energy === 0){
                    this.playAnimation(this.images_Dead);
                    this.stopMove();
                    this.endGame();
                }
            }
            i++;
            if (this.world.character.x > 1660 && !this.firtContact) {
                this.bossIntro();
                this.firtContact = true;
                i = 0;                              
            }            
        },150)
        this.world.allIntervals.push(this.endbossAnimation);    
    }

    startMove() {
        if (this.moveInterval) return;     
            this.moveInterval = setInterval(() => {
                this.x -= 2; 
        }, 1000 / 60); 
    }

    stopMove() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }

    bossIntro() {        
        if (sound) {
            this.audio_boss_intro.play();
            music.pause(); 
        }        
    }

    playSound() {
        if (sound) {
            this.audio_chicken_angry.play();
            this.audio_boss_music.play();    
        }           
    }

    endGame() {
        this.audio_boss_music.pause();  
        this.audio_chicken_angry.pause();
        setTimeout(() => {
            clearInterval(this.endbossAnimation);
            this.stopMove();
            this.world.gameWon = true;                    
        }, 2000);        
    }

    chickenHit() {
        if (this.isHurt()) return;
        this.hurt = true;
        this.energy--;
        console.log(this.energy);    
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