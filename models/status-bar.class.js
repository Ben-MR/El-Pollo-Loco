class StatusBar extends DrawableObject{

    images_statusbar_health = [
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    percentage = 5;

    constructor () {
        super();
        this.loadImages(this.images_statusbar_health);
        this.x = 40
        this.y = 0;
        this.width = 140;
        this.height = 50;
        this.setPercentage(5);
    }

    /**
     * Shows the correct image from the image array. 
     * 
     * @param {number} percentage - position of image in array
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images_statusbar_health[this.resolveImageIndex()]
        this.img = this.imageCache[path];     
    }

    /**
     * Resolves the image index based on the current percentage value.
     * 
     * @returns number
     */
    resolveImageIndex() {
        if (this.percentage == 5) {
            return 5;
        } else if (this.percentage === 4) {
            return 4;
        } else if (this.percentage === 3) {
            return 3;
        } else if (this.percentage === 2) {
            return 2;
        } else if (this.percentage === 1) {
            return 1;
        } else {
            return 0;
        }
    }
}