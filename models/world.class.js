class World {     
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    allIntervals = [];
    bottleThrown = false;
    bottleWait = false;
    bossBar = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.chicken = new Chicken(this);
        this.smallChicken = new SmallChicken(this);
        this.moveableObject = new MoveableObject(this);
        this.level = level1;
        this.endboss = new Endboss(this);
        this.level.enemies.push(this.endboss);
        this.statusBar = new StatusBar();
        this.statusBarBoss = new StatusBarBoss();
        this.statusBarCoin = new StatusBarCoin();
        this.statusBarBottle = new StatusBarBottle();
        this.character = new Character ();
        this.throwableObjects = [];
        this.canvas = canvas;
        this.keyboard = keyboard; 
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Associates the current world instance with the character and lets character 
     * use keyboard.
     */
    setWorld() {
        this.character.world = this; 
    }
    
    /**
     * Starts the main game loop.
     */
    run() {
        this.runInterval = setInterval(() => {
            this.checkCollisions();            
            this.checkThrowObjects();
            this.checkBottleCollisions();
            this.collectCoins();
            this.collectBottles();
        }, 60/1000);
        intervals.push(this.runInterval);
    }

    /**
     * Checks if the character collides with an enemy. It also checks if the collision 
     * is from above, so the enemy gets hit or from any other direction, so the 
     * character gets hit. 
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidingJump(enemy)) {
                enemy.chickenHit();
                this.character.speedY = 2; 
            } else if (this.character.isColliding(enemy)) {
                if (!this.character.isCollidingJump(enemy) && !this.character.isHurt() && hitAfterJump) {
                    this.character.hit();
                    this.statusBar.percentage = this.statusBar.percentage - 1;
                    this.statusBar.setPercentage(this.statusBar.percentage);                 
                }
            }
        });
    }

    /**
     * Throws an object with keypress
     * With bottleThrown only one onject can be thrown with a keypress. 
     * 
     */
    checkThrowObjects() {
        if (this.canThrwoBottle()) {
            this.createNewThrwonBottle();
        }
        if (!this.keyboard.CTRLL) {
            this.bottleThrown = false;
        }     
    }

    /**
     * Returns true if the player is currently allowed to throw a bottle.
     */
    canThrwoBottle() {
        return this.keyboard.CTRLL && 
        !this.bottleThrown && 
        this.statusBarBottle.bottles > 0 && 
        !this.bottleWait
    }

    /**
     * Spawns a new bottle and positions the new bottle just in front of the character.
     * 
     */
    createNewThrwonBottle() {
            this.bottleThrown = true; 
            this.bottleWait = true;
            const offsetX = directionLeft ? 10 : 70;
            let bottle = new ThrowableObjects(this.character.x + offsetX, this.character.y + 100, this.otherDirection);
            this.throwableObjects.push(bottle);
            this.statusBarBottle.bottlesDown();
            setTimeout(() => {
            this.bottleWait = false;
            }, 800);   
    }

    /**
     * Check if the thrown objects hits an enemy.
     * If an enemy is hit, bottle and enemy are removed from level with an animation.
     * Removes bottles from array when not on screen anymore. 
     */    
    checkBottleCollisions() {
    this.throwableObjects.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
            if (bottle.isCollidingComplete(enemy)) {
                enemy.chickenHit(enemy);
                bottle.enemyHit(); 
            }
        });
    });
    this.throwableObjects = this.throwableObjects.filter(bottle => 
        bottle.y <= 500 
    );
}

    /**
     * Checks if the character collides with an coin, removes the coin from display 
     * and raises the coin status-bar.
     */
    collectCoins() {
        this.level.collectablesCoins.forEach((collectablesCoins) => {
            if(this.character.isCollidingComplete(collectablesCoins)) {
                this.statusBarCoin.coinsUp();   
                this.level.collectablesCoins.splice(collectablesCoins, 1);                             
            }
        });
    }

    /**
     * Checks if the character collides with a bottle, removes the bottle from display 
     * and raises the bottle status-bar.
     */
    collectBottles() {
        this.level.collectablesBottles.forEach((collectablesBottles) => {
            if(this.character.isCollidingComplete(collectablesBottles)) {
                this.statusBarBottle.bottlesUp();   
                this.level.collectablesBottles.splice(collectablesBottles, 1);                             
            }
        });
    } 

    /**
    * * Renders all visual game elements onto the canvas.
    *
    * This method clears the canvas, translates the view based on the camera position,
    * and draws all background objects, UI elements, the character, enemies, collectables,
    * and throwable objects in the correct order. It uses `requestAnimationFrame` to
    * continuously call itself for smooth, asynchronous rendering — only if the game is not paused.
    *
    * The translation logic ensures that HUD elements remain fixed while the world scrolls.
     */
    draw() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);            
        this.ctx.translate(this.camera_x, 0);        
        this.drawBackground(); 
        this.drawFixedObjects();
        this.drawGameObjects();         
        this.ctx.translate(-this.camera_x, 0);          
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Draws Background images into canvas
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects); 
        this.addObjectsToMap(this.level.cloud); 
    }

    /**
     * Draws fixed objects into canvas
     */
    drawFixedObjects() {
        this.ctx.translate(-this.camera_x, 0); 
            this.addToMap(this.statusBar);    
            this.addToMap(this.statusBarCoin);     
            this.addToMap(this.statusBarBottle);     
            if (this.bossBar) {
                this.addToMap(this.statusBarBoss); 
            };                  
        this.ctx.translate(this.camera_x, 0);  
    }

    /**
     * Draws game objects into canvas
     */
    drawGameObjects() {
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.collectablesCoins);    
        this.addObjectsToMap(this.level.collectablesBottles);    
        this.addObjectsToMap(this.level.enemies); 
    }

    /**
     * Adds the obejct in the level
     * 
     * @param {img} objects - ex. character, enemys, background
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
       });
    }

    /**
     * Draws a single movable object (mo) onto the canvas, handling its direction.
     * 
     * @param {MovableObject} mo - The movable object to be drawn on the canvas.
     */
    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the character image when walking in other direction
     * 
     * @param {img} mo - character image
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * - 1;
    }

    /**
     * Flips the character image back when walking in other direction
     * 
     * @param {img} mo - character image
     */
    flipImageBack(mo) {
        mo.x = mo.x * - 1;
        this.ctx.restore();
    }
}

