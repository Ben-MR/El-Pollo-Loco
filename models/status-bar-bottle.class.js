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

    setBottle(bottles) {
        this.bottles = bottles;
        let path = this.images_statusbar_bottle[this.resolveImageIndexBottle()]
        this.img = this.imageCache[path];        
    }

    resolveImageIndexBottle() {
        if (this.bottles >= 10) {
            return 5;
        } else if (this.bottles >= 8) {
            return 4;
        } else if (this.bottles >= 6) {
            return 3;
        } else if (this.bottles >= 4) {
            return 2;
        } else if (this.bottles >= 1) {
            return 1;
        } else {
            return 0;
        }
    }

    bottlesUp() {
        this.bottles++ ;   
        this.setBottle(this.bottles);   
        if (sound) {
            this.audio_newBottle.play(); 
        }
          
    }

    bottlesDown() {
        this.bottles--;   
        this.setBottle(this.bottles);     
    }
}