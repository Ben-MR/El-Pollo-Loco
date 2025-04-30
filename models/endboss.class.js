class Endboss extends MoveableObject {
    y = 369;
    height = 60;
    width = 60;
    imagesWalking = [
        // '../img/4_enemie_boss_chicken/1_walk/G1.png',
        // '../img/4_enemie_boss_chicken/1_walk/G2.png',
        // '../img/4_enemie_boss_chicken/1_walk/G3.png',
        // '../img/4_enemie_boss_chicken/1_walk/G4.png',
        '../img/4_enemie_boss_chicken/1_walk/G5.png',
        '../img/4_enemie_boss_chicken/1_walk/G6.png',
        '../img/4_enemie_boss_chicken/1_walk/G7.png',
        '../img/4_enemie_boss_chicken/1_walk/G8.png',
        '../img/4_enemie_boss_chicken/1_walk/G9.png',
        '../img/4_enemie_boss_chicken/1_walk/G10.png',
        '../img/4_enemie_boss_chicken/1_walk/G11.png',
        '../img/4_enemie_boss_chicken/1_walk/G12.png',
    ];

    constructor() {
        super().loadImage(this.imagesWalking[0]);
        this.loadImages(this.imagesWalking);
        this.x = 600;
        this.animate();
    }
}