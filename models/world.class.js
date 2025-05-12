class World {
    paused = false;  
    gameOver = false;
    gameWon = false;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    allIntervals = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.chicken = new Chicken(this);
        this.moveableObject = new MoveableObject(this);
        this.level = level1;
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        this.statusBar = new StatusBar();
        this.statusBarCoin = new StatusBarCoin();
        this.statusBarBottle = new StatusBarBottle();
        this.character = new Character ();
        this.throwableObjects = [];
        this.canvas = canvas;
        this.keyboard = keyboard; 
        this.draw();
        this.setWorld();
        this.run();
        this.pauseGame();
    }

    setWorld() {
        this.character.world = this; // Dadurch kann die Character-Klasse auf Keyboard zugreifen
    }

    pauseGame() {
        if(this.keyboard.P) {
            this.paused = !this.paused;
            this.draw();
            clearInterval(this.moveableObject.moveLeftInterval);
            console.log(this.moveableObject.moveLeftInterval);
            console.log(this.moveableObject);
            
            music.pause();
        }
    }

    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();            
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.collectCoins();
            this.collectBottles();
            this.pauseGame();
            this.gameOverFunction();
            this.gameWonFunction();
        }, 200);
        this.allIntervals.push(this.runInterval);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingJump(enemy)) {
                enemy.chickenHit();
                this.character.speedY = 10; 
            } else if (this.character.isColliding(enemy)) {
                if (!this.character.isCollidingJump(enemy) && !this.character.isHurt()) {
                    this.character.hit();
                    this.statusBar.percentage = this.statusBar.percentage - 5;
                    this.statusBar.setPercentage(this.statusBar.percentage);                 
                }
            }
        });
    }

    checkThrowObjects() {
        if(this.keyboard.CTRLL && this.statusBarBottle.bottles > 0) {
            let bottle = new ThrowableObjects (this.character.x +70, this.character.y + 100);
            this.throwableObjects.push(bottle);
            //this.statusBarBottle.bottlesDown(); 
        }
    }

    checkBottleCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isCollidingComplete(enemy)) {
                    enemy.chickenHit(enemy);
                    bottle.enemyHit();
                }else if (bottle.y > 500) {
                    this.throwableObjects.splice(bottle, 1)
                }
            });
        });
    }

    collectCoins() {
        this.level.collectablesCoins.forEach((collectablesCoins) => {
            if(this.character.isCollidingComplete(collectablesCoins)) {
                this.statusBarCoin.coinsUp();   
                this.level.collectablesCoins.splice(collectablesCoins, 1);                             
            }
        });
    }

    collectBottles() {
        this.level.collectablesBottles.forEach((collectablesBottles) => {
            if(this.character.isCollidingComplete(collectablesBottles)) {
                this.statusBarBottle.bottlesUp();   
                this.level.collectablesBottles.splice(collectablesBottles, 1);                             
            }
        });
    }

    gameOverFunction() {
        if (this.gameOver) {
            this.paused = !this.paused;
            this.gameOver = false;
            document.getElementById('gameOverPicture').classList.remove('d-none');
        }
    }

    gameOverFunction() {
        if (this.gameOver) {
            this.paused = !this.paused;
            this.gameOver = false;
            document.getElementById('gameOverPicture').classList.remove('d-none');
        }
    }

    gameWonFunction() {
        if (this.gameWon) {
            this.paused = !this.paused;
            this.gameWon = false;
            document.getElementById('gameWonPicture').classList.remove('d-none');
        }
    }

    draw() {
        if(!this.paused) {
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
            this.addObjectsToMap(this.level.collectablesCoins);    
            this.addObjectsToMap(this.level.collectablesBottles);    
            this.addObjectsToMap(this.level.enemies);     
            this.ctx.translate(-this.camera_x, 0);         
            //Draw wird immer wieder aufgerufen
            let self = this; //this funktioniert in der unteren Funktion nicht mehr, daher eine neue Variable
            requestAnimationFrame(function(){ // Funktion wird ausgeführt, sobald alles darüber fertig gezeichnet wurde, also wird asynchron später ausgeführt
                self.draw();
            });
        }
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
        mo.drawFrame2(this.ctx);
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

