class MoveableObject extends DrawableObject {   
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    energy = 5;
    lastHit = 0;
    moveLeftInterval;
    gravityIntervall;
    

    constructor(world) {
        super();
        this.world = world;          
    }

    /**
    * Applies gravity to the object by continuously updating its vertical position.
    *
    * Uses a timed interval to simulate gravity. If the object is above ground or moving upward,
    * it moves the object down by decreasing its vertical speed (`speedY`) based on an 
    * acceleration factor.
     */
applyGravity(){
    this.gravityIntervall = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        }
        if (this.y > 175 && this instanceof Character) {  
            this.y = 175;
            this.speedY = 0;
        }
    }, 1000 / 25);
    intervals.push(this.gravityIntervall);
}

    /**
     * Checks if object is above ground.
     * Thrwoable Objects should always fall.
     * 
     */
    isAboveGround() {        
        if(this instanceof ThrowableObjects) {//
            return true
        } else {
            return this.y < 175;
        }
    }

    /**
     * Checks for a complete collision between this object and another movable object.
     *
     * The collision is calculated using the positions, dimensions, and offset values
     * of both objects to allow for precise bounding box detection.
     *
     * @param {MovableObject} enemy - The object to check collision against.
     * @returns {boolean} True if the objects collide, otherwise false.
     */
    isCollidingComplete(mo) {
        return (
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
        );
    }

    /**
     * Checks if the character is colliding with an enemy from above (a jump hit).
     *
     * The method compares the bottom of the character with the top of the enemy,
     * factoring in custom horizontal and vertical buffers for forgiving hit detection.
     * A valid collision only occurs when the character is moving downward (negative Y velocity).
     *
     * @param {MovableObject} enemy - The object to check collision against.
     * @returns {boolean} True if the character hits the enemy from above while falling.
     */
    isCollidingJump(enemy) {
        return this.isHorizontallyOverlappingWith(enemy) &&
            this.isVerticallyLandingOn(enemy) &&
            this.speedY < 0;
    }

    isHorizontallyOverlappingWith(enemy) {
        const characterLeft = this.x + this.offset.left;
        const characterRight = this.x + this.width - this.offset.right;
        const enemyLeft = enemy.x + enemy.offset.left;
        const enemyRight = enemy.x + enemy.width - enemy.offset.right;
        return characterRight > enemyLeft && characterLeft < enemyRight;
    }

    isVerticallyLandingOn(enemy) {
        const characterBottom = this.y + this.height - this.offset.bottom;
        const enemyTop = enemy.y + enemy.offset.top;
        const verticalBuffer = 8;
        return (
            characterBottom > (enemyTop - verticalBuffer) &&
            characterBottom < (enemyTop + verticalBuffer)
        );
    }
   
    /**
     * Checks if this object is colliding with another object on any side (full bounding box check).
     *
     * Collision detection uses the position, width, height, and offset values of both objects.
     *
     * @param {MovableObject} enemy - The object to check collision against.
     * @returns {boolean} True if the two objects collide in any direction.
     */
    isColliding(enemy) {
        return this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right &&
            this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
            this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom;
    }

    /**
     * Reduces energy from character when it collides with enemy object
     */
    hit() {
        this.energy -= 1;   
        if (this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Sets the time when character can't be hurt after being hurt.
     * 
     * @returns number of delay time
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;     
        return timePassed < 2;       
    };

    /**
     * Checks if energy of character is zero.
     *  
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves an obejct to the left. 
     * 
     * @param {number} speed - how fast the character moves left
     * @param {numer} time - time of the interval
     */
    moveLeft(speed, time){        
        this.moveLeftInterval = setInterval(() => {
            this.x -= speed;
        }, time);    
        intervals.push(this.moveLeftInterval);
    }    

    /**
     * Moves charcter to the right.
     */
    moveRight() {
        this.x += this.speed;   
        this.otherDirection = false;
    }

    /**
     * Sets the hight of the character jump.
     */
    jump(){
        this.speedY = 25; 
    }

    /**
     /**
     * Cycles through a given array of image paths to play an animation.
     *
     * Uses the modulo operator to loop the animation based on the `currentImage` index,
     * ensuring that it stays within the bounds of the provided image array.
     * The corresponding image is retrieved from the image cache and set as the current image.
     * 
     * @param {path} images - path of the images for the animation 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}