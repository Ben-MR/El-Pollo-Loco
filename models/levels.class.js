class Level {
    enemies;
    cloud;
    backgroundObjects;
    collectablesCoins;
    level_end_x = 2180;

    constructor(enemies, cloud, backgroundObjects, collectablesCoins) {
        this.enemies = enemies;
        this.cloud = cloud;
        this.backgroundObjects = backgroundObjects;
        this.collectablesCoins = collectablesCoins
    }

}