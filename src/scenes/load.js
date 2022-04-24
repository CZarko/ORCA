class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        //let loadingBar = this.add.graphics()

        this.load.path = './assets/';
        // load graphic assets
        this.load.image('background', 'img/sample.png');
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