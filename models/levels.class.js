class Level {
    enemies;
    cloud;
    backgroundObjects;
    collectablesCoins;
    collectablesBottles;
    level_end_x = 2180;

    constructor(enemies, cloud, backgroundObjects, collectablesCoins, collectablesBottles) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;
        this.collectablesCoins = collectablesCoins;
        this.collectablesBottles = collectablesBottles;
    }

}