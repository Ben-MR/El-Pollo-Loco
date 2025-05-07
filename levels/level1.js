let level1;
function initLevel() {    

level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),     
    ],
    [
        new Cloud('./img/5_background/layers/4_clouds/1.png', 300, 20),
        new Cloud('./img/5_background/layers/4_clouds/1.png', 850, 20),
        new Cloud('./img/5_background/layers/4_clouds/1.png', 1750, 20),
    ],
    [
        new BackgroundObject('./img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 0, 180),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 0, 180),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 0, 180),
        new BackgroundObject('./img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719, 180),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719, 180),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719, 180),
        new BackgroundObject('./img/5_background/layers/air.png', 719 *2, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/1.png', 719 *2, 180),
        new BackgroundObject('./img/5_background/layers/2_second_layer/1.png', 719 *2, 180),
        new BackgroundObject('./img/5_background/layers/1_first_layer/1.png', 719 *2, 180),
        new BackgroundObject('./img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('./img/5_background/layers/3_third_layer/2.png', 719 * 3, 180),
        new BackgroundObject('./img/5_background/layers/2_second_layer/2.png', 719 * 3 , 180),
        new BackgroundObject('./img/5_background/layers/1_first_layer/2.png', 719 * 3, 180),
    ],
    [
        new CollectableObjectsCoins('./img/8_coin/coin_1.png', 900, 250),
        new CollectableObjectsCoins('./img/8_coin/coin_1.png', 800, 100),
        new CollectableObjectsCoins('./img/8_coin/coin_1.png', 1000, 100),
    ],
    [
        new CollectableObjectsBottles('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 400),
        new CollectableObjectsBottles('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1200),
        new CollectableObjectsBottles('./img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1300),
    ]
)
}

