class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;    
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image(); //Image ist bereits durch JS definiert. Ist das gleiche wie: this.img = document.getElementById('image') <img id="image"  scr>
        this.img.src = path;
    }

    draw(ctx)  {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);     
    }

    drawFrame(ctx) { //Kästen für Kollisionsabfrage
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof CollectableObjectsCoins) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();  
        }
    }

    loadImages(arr) {
        arr.forEach((path) => {   
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}