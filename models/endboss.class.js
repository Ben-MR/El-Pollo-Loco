class Endboss extends MoveableObject {
    y = 205;
    x= 2100;
    height = 230;
    width = 230;
    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    }
    imagesWalking = [
        // '../img/4_enemie_boss_chicken/1_walk/G1.png',
        // '../img/4_enemie_boss_chicken/1_walk/G2.png',
        // '../img/4_enemie_boss_chicken/1_walk/G3.png',
        // '../img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.imagesWalking)
        }, 150);
        // this.moveLeft((0.2 + Math.random() * 0.25), 1000/60); 
    }  
}