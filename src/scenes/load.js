class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        this.load.path = './assets/';

        // load graphic assets
        this.load.image('menu-bg', 'img/orca_big.png');

        this.load.image('bg-back', 'img/sky-v2.jpg');
        this.load.image('bg-front', 'img/sky.png');
        this.load.image('back-building', 'img/big_back_buildings.png');
        this.load.image('mid-building', 'img/medium_mid_buildings.png');
        this.load.image('fore-building', 'img/small_front_buildings.png');

        this.load.spritesheet('clicker', 'img/clicker.png', {frameWidth: 881, frameHeight: 1388, startFrame: 0, endFrame: 4});

        this.load.spritesheet('player', 'img/orca_swim.png', {frameWidth: 1000, frameHeight: 518, startFrame: 0, endFrame: 2});
        this.load.image('jet-plane', 'img/jet_plane.png');
        this.load.image('big-plane', 'img/big_airplane.png');
        this.load.image('fighter-jet', 'img/fighter_jet.png');
        this.load.image('cloud-0', 'img/cloud_med_2.png');
        this.load.image('cloud-1', 'img/cloud_long_3.png');
        this.load.spritesheet('explosion', 'img/blood_sheet.png', {frameWidth: 988, frameHeight: 1009, startFrame: 0, endFrame: 4});

        // load sfx assets
        this.load.audio('drifting-higher', ['sound/Drifting-Higher.mp3', 'sound/Drifting-Higher.ogg']);
        this.load.audio('drifting-away', ['sound/Drifting-Away.mp3', 'sound/Drifting-Higher.ogg']);
        this.load.audio('jump-sfx','sound/Jump-E.wav');
        this.load.audio('crash-sfx','sound/Crash-GGfA.wav');
        this.load.audio('select-sfx', 'sound/Select-b4.wav');
    }

    create() {
        let higher = game.sound.add('drifting-higher');
        higher.volume = 0.1;
        higher.play();
        higher.on('complete', () => {
            let away = game.sound.add('drifting-away');
            away.volume = 0.1;
            away.loop = true;
            away.play();
        });
        this.scene.start("Menu");
    }
}