class World {
    character = new Character ();
    chicken = new Chicken();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar;
    statusBarCoin = new StatusBarCoin;
    statusBarBottle = new StatusBarBottle;
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this; // Dadurch kann die Character-Klasse auf Keyboard zugreifen
    }

    run() {
        setInterval(() => {
            this.checkCollisions();            
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.collectCoins();
            this.collectBottles();
        }, 200);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                this.character.hit();  
                this.statusBar.setPercentage(this.statusBar.percentage -= 5);                                
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.CTRLL && this.statusBarBottle.bottles > 0) {
            let bottle = new ThrowableObjects (this.character.x +70, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.bottlesDown(); 
        }
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    enemy.ChickenDead(enemy);
                    bottle.enemyHit();
                }
            });
        });
    }

    collectCoins() {
        this.level.collectablesCoins.forEach((collectablesCoins) => {
            if(this.character.isColliding(collectablesCoins)) {
                this.statusBarCoin.coinsUp();   
                this.level.collectablesCoins.splice(collectablesCoins, 1);                             
            }
        });
    }

    collectBottles() {
        this.level.collectablesBottles.forEach((collectablesBottles) => {
            if(this.character.isColliding(collectablesBottles)) {
                this.statusBarBottle.bottlesUp();   
                this.level.collectablesBottles.splice(collectablesBottles, 1);                             
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);            
        this.ctx.translate(this.camera_x, 0);        
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.cloud);       
        //space for fixed Objects  
        this.ctx.translate(-this.camera_x, 0); //back
        this.addToMap(this.statusBar);    
        this.addToMap(this.statusBarCoin);     
        this.addToMap(this.statusBarBottle);          
        this.ctx.translate(this.camera_x, 0);  //forward 

        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies); 
        this.addObjectsToMap(this.level.collectablesCoins);    
        this.addObjectsToMap(this.level.collectablesBottles);        
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
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }


}

