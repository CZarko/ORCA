class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.path = './assets/';

        // load graphic assets
        this.load.image('menu-bg', 'img/i_can_orca.jpg');

        this.load.image('bg-back', 'img/sky-v2.jpg');
        this.load.image('bg-front', 'img/sky.png');
        this.load.image('back-building', 'img/big_back_buildings.png');
        this.load.image('mid-building', 'img/medium_mid_buildings.png');
        this.load.image('fore-building', 'img/small_front_buildings.png')

        this.load.image('player', 'img/orca_draft.png');
        this.load.image('jet-plane', 'img/jet_plane.png');
        this.load.image('big-plane', 'img/big_airplane.png');
        this.load.image('fighter-jet', 'img/fighter_jet.jpg');
        this.load.image('cloud-0', 'img/cloud_med_2.png');
        this.load.image('cloud-1', 'img/cloud_long_3.png');
        this.load.spritesheet('explosion', 'img/explosion.png', {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 13});

        // load sfx assets
        //this.load.audio('jump-sfx','sound/waterSplash.mp3');
        //this.load.audio('crash-sfx','sound/Crash.mp3');
    }

    create() {
        this.scene.start("Menu");
    }
}