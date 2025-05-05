class StatusBarBottle extends DrawableObject {
    images_statusbar_bottle = [
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        '../img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ]

    percentageBottle = 0;


    constructor () {
        super();
        this.loadImages(this.images_statusbar_bottle);
        this.x = 40
        this.y = 75;
        this.width = 140;
        this.height = 50;
        this.setPercentageBottle(0);
    }

    setPercentageBottle(percentageBottle) {
        this.percentageBottle = percentageBottle;
        let path = this.images_statusbar_bottle[this.resolveImageIndexBottle()]
        this.img = this.imageCache[path];        
    }

    resolveImageIndexBottle() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}