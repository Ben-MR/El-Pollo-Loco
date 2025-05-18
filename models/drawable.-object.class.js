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