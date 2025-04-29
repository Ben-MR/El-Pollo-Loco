class MoveableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); //Image ist bereits durch JS definiert. Ist das gleiche wie: this.img = document.getElementById('image') <img id="image"  scr>
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
        
    }

    moveLeft() {
        
    }
}