class StatusBarBottle extends DrawableObject {
    images_statusbar_bottle = [
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    audio_newBottle = new Audio ('./audio/pick_up_bottle.mp3')
    bottles = 0;


    constructor () {
        super();
        this.loadImages(this.images_statusbar_bottle);
        this.x = 40
        this.y = 75;
        this.width = 140;
        this.height = 50;
        this.setBottle(0);
        sounds.push(this.audio_newBottle);
    }

    /**
     * Shows the correct image from the image array. 
     * 
     * @param {number} percentage - position of image in array
     */
    setBottle(bottles) {
        this.bottles = bottles;
        let path = this.images_statusbar_bottle[this.resolveImageIndexBottle()]
        this.img = this.imageCache[path];        
    }

    
    /**
     * Resolves the image index based on the current percentage value.
     * 
     * @returns number
     */
    resolveImageIndexBottle() {
        if (this.bottles >= 15) {
            return 5;
        } else if (this.bottles >= 12) {
            return 4;
        } else if (this.bottles >= 9) {
            return 3;
        } else if (this.bottles >= 6) {
            return 2;
        } else if (this.bottles >= 3) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
    * Increases the bottle counter by one and updates the visual display.
    *
    * Also plays a sound effect when a new bottle is collected, if sound is enabled.
     */
    bottlesUp() {
        this.bottles++ ;   
        this.setBottle(this.bottles);   
        if (sound) {
            this.audio_newBottle.play(); 
        }          
    }

    /**
     * Reduces the bottle counter by one and updates the visual display.
     */
    bottlesDown() {
        this.bottles--;   
        this.setBottle(this.bottles);     
    }
}