class Chicken extends MoveableObject {
    y = 369;
    height = 60;
    width = 60;
    chickenAnimation;
    offset = {
        top: 25,
        left: 2,
        right: 2,
        bottom: 5
    }
    dead = false;
    imagesWalking = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imagesDead = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];    
    audio_dead = new Audio ('./audio/chicken-hit.mp3');  
   

    constructor(x, y) {
        super();
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x; 
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
    };

    /**
     * Starts the chicken's walk/death animation loop and movement.
     *
     * Sets up a repeating interval to:
     *  - Play the death animation if the chicken is marked dead.
     *  - Otherwise, cycle through the walking images.
     * Initiates leftward movement at a random speed between 0.2 and 0.45 units/frame.
     * Stores the interval ID for later cleanup.
     *
     */
    animate() {
        this.chickenAnimation = setInterval(() => {
            if(this.dead) {
                this.deadAnimation();
            }else
            this.playAnimation(this.imagesWalking)
        }, 150);
        this.moveLeft((0.2 + Math.random() * 0.25), 1000/60);      
        intervals.push(this.chickenAnimation);
    }

    /**
     * Marks the chicken as hit (dead), triggering the death animation on the next frame.
     */
    chickenHit() {
        hitAfterJump = false;
        this.dead = true;   
        setTimeout(() => {
            hitAfterJump = true;
        }, 200);
    }

    /**
     * Plays the chicken's death animation, plays a sound if enabled,
     * stops the walk animation interval, and makes the dead sprite fall.
     */
    deadAnimation() {
        this.playAnimation(this.imagesDead);
        if (sound) {
            this.audio_dead.play();
        };        
        clearInterval(this.chickenAnimation);
        setInterval(() => {
            this.y += 10;
        }, 50);  
    }
} 