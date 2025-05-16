class ThrowableObjects extends MoveableObject{
    speedY = 0;
    speedX = 0;
    bottleHit = false
    offset = {
        top: 10,
        left: 10,
        right: 10,
        bottom: 10
    }


    images_Bottle_Rotation = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    images_Bottle_Splash = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]
    audio_enemyHit = new Audio ('./audio/bottle-smash-107832.mp3')

    constructor(x, y) {
        super();
        this.loadImage('./img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.images_Bottle_Rotation);
        this.loadImages(this.images_Bottle_Splash);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.throw();
    }

    /**
     * Animation and physics for bottle throw.
     * Checks with directionLeft if character moves right or left.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        if (!directionLeft) {
            this.throwsBottleRight();
        }
        if (directionLeft) {
            this.throwsBottleLeft();
        }
        this.animateBottleThrow();          
    }

    /**
     * Moves bottle-object to the right.
     */
    throwsBottleRight() {
        this.moveInterval = setInterval(() => {
        this.x += 5;
        }, 25);
    }

    /**
     * Moves bottle-object to the left.
     */
    throwsBottleLeft() {
        this.moveInterval = setInterval(() => {
        this.x -= 5;
        }, 25);
    }

    /**
     * Animation for bottle throw.
     * Stops animation when an enemy is hit, starts the bottle splash animation and 
     * removes the object from level. 
     */
    animateBottleThrow() {
        this.animationInterval = setInterval(() => {
            if (this.bottleHit) {
                clearInterval(this.animationInterval); 
                this.playAnimation(this.images_Bottle_Splash); 
                setTimeout(() => {
                    this.removeBottle();
                }, 200); 
            } else {
                this.playAnimation(this.images_Bottle_Rotation); 
            }
        }, 50);
    }

    /**
     * Stops the interval of a thrown object.
     */
    enemyHit() {
        this.bottleHit = true;
        clearInterval(this.moveInterval);
        clearInterval(this.gravityIntervall);
        this.animateBottleThrow();   
        if (sound) {
            this.audio_enemyHit.play();  
        }            
    }

    /**
     * Removes thrown bottle from level
     */
    removeBottle() {
        this.x = -1000;
    }
}