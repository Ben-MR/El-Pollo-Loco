class Chicken extends MoveableObject {
    y = 369;
    height = 60;
    width = 60;
    offset = {
        top: 5,
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
   

    constructor(world) {
        super(world);
        this.world = world;
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 500;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
    };

    animate() {
        this.chickenAnimation = setInterval(() => {
            if(this.dead) {
                this.deadAnimation();
            }else
            this.playAnimation(this.imagesWalking)
        }, 50);
        this.moveLeft((0.2 + Math.random() * 0.25), 1000/60);   
        // console.log(this.world.allIntervals);    
    }

    chickenHit() {
        this.dead = true;   
    }

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