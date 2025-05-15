class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;    
    height = 150;
    width = 100;

    constructor() {
        world = this.world;
    }

    /**
     * Loads a single image and assigns it to the object.
     * 
     * @param {string} path - file path to the image.
     */
    loadImage(path) {
        this.img = new Image(); //Image ist bereits durch JS definiert. Ist das gleiche wie: this.img = document.getElementById('image') <img id="image"  scr>
        this.img.src = path;
    }

    /**
     * Draws the object's current image on the given canvas context.
     * 
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx)  {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);     
    }

    drawFrame(ctx) { //Kästen für Kollisionsabfrage
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObjects || this instanceof CollectableObjectsCoins || this instanceof CollectableObjectsBottles) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();  
        }
    }

    drawFrame2(ctx) {
        if (
            this instanceof Character ||
            this instanceof Chicken ||
            this instanceof Endboss ||
            this instanceof ThrowableObjects ||
            this instanceof CollectableObjectsCoins ||
            this instanceof CollectableObjectsBottles ||
            this instanceof SmallChicken
        ) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'red';    
            const x = this.x + (this.offset?.left || 0);
            const y = this.y + (this.offset?.top || 0);
            const width = this.width - ((this.offset?.left || 0) + (this.offset?.right || 0));
            const height = this.height - ((this.offset?.top || 0) + (this.offset?.bottom || 0));    
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
    }

    /**
     * Loads multiple images into the image cache.
     * Used for animation frames or image states.
     * @param {string[]} arr - An array of image file paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {   
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

}