class StatusBarCoin extends DrawableObject {

    images_statusbar_coin = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]

    percentageCoin = 0;


    constructor () {
        super();
        this.loadImages(this.images_statusbar_coin);
        this.x = 40
        this.y = 35;
        this.width = 140;
        this.height = 50;
        this.setPercentageCoin(0);
    }

    setPercentageCoin(percentageCoin) {
        this.percentageCoin = percentageCoin;
        let path = this.images_statusbar_coin[this.resolveImageIndexCoin()]
        this.img = this.imageCache[path];        
    }

    resolveImageIndexCoin() {
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
