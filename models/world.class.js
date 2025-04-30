class World {
    character = new Character ();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this; // Dadurch kann die Character-Klasse auf Keyboard zugreifen
    }

    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);            
        this.ctx.translate(this.camera_x, 0);        
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);           
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.cloud);      

        this.ctx.translate(-this.camera_x, 0);

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
        if(mo.otherDirection) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * - 1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        if(mo.otherDirection) {
            mo.x = mo.x * - 1;
            this.ctx.restore();
        }
    }



}

