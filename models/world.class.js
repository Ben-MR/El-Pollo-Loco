class World {
    character = new Character ();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    cloud = [
        new Cloud
    ];
    backgroundObjects = [
        new BackgroundObject('../img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0, 180),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0, 180),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 180),
        
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);           
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.cloud);      
        //Draw wird immer wieder aufgerufen
        let self = this; //this funktioniert in der unteren Funktion nicht mehr, daher eine neue Variable
        requestAnimationFrame(function(){ // Funktion wird ausgeführt, sobald alles darüber fertig gezeichnet wurde, also wird asynchron später ausgeführt
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
       });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
    }

}

