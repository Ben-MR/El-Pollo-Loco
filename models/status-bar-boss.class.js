class StatusBarBoss extends DrawableObject {
    images_statusbar_boss = [
        './img/7_statusbars/2_statusbar_endboss/green/green0.png',
        './img/7_statusbars/2_statusbar_endboss/green/green20.png',
        './img/7_statusbars/2_statusbar_endboss/green/green40.png',
        './img/7_statusbars/2_statusbar_endboss/green/green60.png',
        './img/7_statusbars/2_statusbar_endboss/green/green80.png',
        './img/7_statusbars/2_statusbar_endboss/green/green100.png',
    ];
    bossEnergy = 5;


    constructor () {
        super();
        this.loadImages(this.images_statusbar_boss);
        this.x = 560
        this.y = 65;
        this.width = 140;
        this.height = 50;
        this.setBossBar(5);    
    }

    /**
     * Shows the correct image from the image array. 
     * 
     * @param {number} bossEnergy - position of image in array
     */
    setBossBar(bossEnergy) {
        this.bossEnergy = bossEnergy;
        let path = this.images_statusbar_boss[this.resolveImageIndexBossBar()]
        this.img = this.imageCache[path];     
    }

    
    /**
     * Resolves the image index based on the current energy value.
     * 
     * @returns number
     */
    resolveImageIndexBossBar() {
        if (this.bossEnergy == 5) {
            return 5;
        } else if (this.bossEnergy == 4) {
            return 4;
        } else if (this.bossEnergy == 3) {
            return 3;
        } else if (this.bossEnergy == 2) {
            return 2;
        } else if (this.bossEnergy == 1) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Reduces the energy counter by one and updates the visual display.
     */
    energyDown() {
        this.bossEnergy--;   
        this.setBossBar(this.bossEnergy);             
    }
}