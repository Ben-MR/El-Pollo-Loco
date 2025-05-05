class StatusBarCoin extends DrawableObject {

    images_statusbar_coin = [
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        '../img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]

    percentageCoin = 0;


    constructor () {
        super();
        this.loadImages(this.images_statusbar_coin);
        this.x = 40
        this.y = 20;
        this.width = 140;
        this.height = 50;
    }
}