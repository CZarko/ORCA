class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        //let loadingBar = this.add.graphics()

        this.load.path = './assets/';
        // load graphic assets
        this.load.image('bg', 'img/sky.png');
        this.load.image('back-building', 'img/big_back_buildings.png');
        this.load.image('mid-building', 'img/medium_mid_buildings.png');
        this.load.image('fore-building', 'img/small_front_buildings.png')


        this.load.image('player', 'img/orca_draft.png');
        this.load.image('obstacle', 'img/office_building.png');
        this.load.spritesheet('explosion', 'img/explosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});
        // load sfx assets
        //this.load.audio('jump-sfx','sound/waterSplash.mp3');
        //this.load.audio('crash-sfx','sound/Crash.mp3');
    }

    create() {
        this.scene.start("Menu");
    }
}