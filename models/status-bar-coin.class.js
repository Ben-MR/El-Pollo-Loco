class StatusBarCoin extends DrawableObject {

    
    images_statusbar_coin = [
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ]
    coins = 0;
    audio_newCoin = new Audio ('./audio/coin-recieved.mp3')

    constructor () {
        super();
        this.loadImages(this.images_statusbar_coin);
        this.x = 40
        this.y = 35;
        this.width = 140;
        this.height = 50;
        this.setCoins(0);
        sounds.push(this.audio_newCoin);
    }

    /**
     * Shows the correct image from the image array. 
     * 
     * @param {number} percentage - position of image in array
     */
    setCoins(coins) {
        this.coins = coins;
        let path = this.images_statusbar_coin[this.resolveImageIndexCoin()]
        this.img = this.imageCache[path];        
    }

    /**
     * Resolves the image index based on the current percentage value.
     * 
     * @returns number
     */
    resolveImageIndexCoin() {
        if (this.coins >= 20) {
            return 5;
        } else if (this.coins >= 15) {
            return 4;
        } else if (this.coins >= 10) {
            return 3;
        } else if (this.coins >= 5) {
            return 2;
        } else if (this.coins >= 1) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
    * Increases the coin counter by one and updates the visual display.
    *
    * Also plays a sound effect when a new coin is collected, if sound is enabled.
     */
    coinsUp() {
        this.coins++;   
        this.setCoins(this.coins);  
        if (sound) {
            this.audio_newCoin.play();   
        }       
    }
}
