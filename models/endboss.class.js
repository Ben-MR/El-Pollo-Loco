class Endboss extends MoveableObject {
    y = 205;
    x= 2100;
    height = 230;
    width = 230;
    energy = 3;
    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    }
    images_Alert = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    images_Walking = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png',

    ];
     images_Hurt = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];
    images_Dead = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    constructor() {
        super().loadImage(this.images_Walking[0]);
        this.loadImages(this.images_Walking);
        this.loadImages(this.images_Alert);
        this.loadImages(this.images_Hurt);
        this.loadImages(this.images_Dead);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.energy === 3) {
                this.playAnimation(this.images_Walking);
            }else if(this.energy === 2) {
                this.playAnimation(this.images_Walking);
            }else if(this.energy === 1){
                this.playAnimation(this.images_Hurt);
            }else if(this.energy === 0) {
                this.playAnimation(this.images_Dead);
            }
        }, 150);
       // this.moveLeft((0.2 + Math.random() * 0.25), 1000/60); 
    }  

    // animate() {
    //     setInterval(() => {
    //         if(this.dead) {
    //             this.playAnimation(this.imagesDead);
    //             setInterval(() => {
    //                 this.y += 5;
    //             }, 50);   
    //         }else
    //         this.playAnimation(this.imagesWalking)
    //     }, 50);
    //     this.moveLeft((0.2 + Math.random() * 0.25), 1000/60);   
    // }

    chickenHit() {
        this.energy--;
        console.log(this.energy);
           
    }
}