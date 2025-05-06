class Chicken extends MoveableObject {
    y = 369;
    height = 60;
    width = 60;
    offset = {
        top: 10,
        left: 5,
        right: 5,
        bottom: 5
    }
    dead = false;
    imagesWalking = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    imagesDead = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]
   

    constructor() {
        super().loadImage('../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 400 + Math.random() * 500;
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesDead);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if(this.dead) {
                this.playAnimation(this.imagesDead);
                setInterval(() => {
                    this.y += 5;
                }, 50);   
            }else
            this.playAnimation(this.imagesWalking)
        }, 50);
        this.moveLeft((0.2 + Math.random() * 0.25), 1000/60);   
    }

    chickenHit() {
        this.dead = true;   
    }


} 