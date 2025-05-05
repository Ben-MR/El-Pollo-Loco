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
    energy = 100;
    lastHit = 0;



    applyGravity(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
            }
        }, 1000/25 );
    }

    isAboveGround() {
        return this.y < 175;
    }



    isColliding (mo) {
        return this.x + this.width - this.offset.right > mo.x &&
            this.y + this.height - this.offset.bottom > mo.y &&
            this.x + this.offset.left < mo.x &&
            this.y + this.offset.top < mo.y + mo.height
    }

    hit() {
        this.energy -= 5;   
        if (this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;// Difference im ms
        timePassed = timePassed / 1000; //Uwandlung in Sekunden        
        return timePassed < 1;
    };

    isDead() {
        return this.energy == 0;
    }

    moveLeft(speed, time){
        setInterval(() => {
            this.x -= speed;
        }, time);        
    }    

    moveRight() {
        this.x += this.speed;   
        this.otherDirection = false;
    }

    jump(){
        this.speedY = 25;
    }

    playAnimation(images) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
    }
}