const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
        
    ],
    [
        new Cloud('../img/5_background/layers/4_clouds/1.png', 300, 20),
        new Cloud('../img/5_background/layers/4_clouds/1.png', 850, 20),
        new Cloud('../img/5_background/layers/4_clouds/1.png', 1750, 20),
    ],
    [
        new BackgroundObject('../img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0, 180),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0, 180),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0, 180),
        new BackgroundObject('../img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719, 180),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719, 180),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719, 180),
        new BackgroundObject('../img/5_background/layers/air.png', 719 *2, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 719 *2, 180),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 719 *2, 180),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 719 *2, 180),
        new BackgroundObject('../img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 719 * 3, 180),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 719 * 3 , 180),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 719 * 3, 180),
    ]
)