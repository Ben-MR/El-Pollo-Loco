class SmallChicken extends MoveableObject {
    y = 369;
    height = 50;
    width = 50;
    smallChickenAnimation;
    offset = {
        top: 5,
        left: 2,
        right: 2,
        bottom: 5
    }
    dead = false;
    imagesWalking = [
        './img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    imagesDead = [
        './img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];    
    audio_dead = new Audio ('./audio/chicken-hit.mp3');
   

    constructor(x, y, world) {
        super(world);
        this.world = world;
        this.loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x 
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
    };

    animate() {
        this.smallChickenAnimation = setInterval(() => {
            if(this.dead) {
                this.deadAnimation();
            }else
            this.playAnimation(this.imagesWalking)
        }, 150);
        this.moveLeft((0.4 + Math.random() * 0.25), 1000/60);     
        intervals.push(this.smallChickenAnimation);
    }

    chickenHit() {
        this.dead = true;   
    }

    deadAnimation() {
        this.playAnimation(this.imagesDead);
        if (sound) {
            this.audio_dead.play();
        };        
        clearInterval(this.smallChickenAnimation);
        setInterval(() => {
            this.y += 10;
        }, 50);  
    }
} 