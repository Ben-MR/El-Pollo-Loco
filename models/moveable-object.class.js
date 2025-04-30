class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image(); //Image ist bereits durch JS definiert. Ist das gleiche wie: this.img = document.getElementById('image') <img id="image"  scr>
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png',...]
     */
    loadImages(arr) {
        arr.forEach((path) => {   
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft(speed, time){
        setInterval(() => {
            this.x -= speed;
        }, time);        
    }    

    playAnimation() {
            let i = this.currentImage % this.imagesWalking.length;
            let path = this.imagesWalking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }
}