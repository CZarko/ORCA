class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        //let loadingBar = this.add.graphics()

        this.load.path = './assets/';
        // load graphic assets
        this.load.image('background', 'img/background.png');
        this.load.image('player', 'img/tile.png');
        this.load.image('obstacle', 'img/tile.png');
        this.load.image('platform', 'img/tile.png');
    }

    create() {
        // global key assignment
        //keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.scene.start("Menu");
    }
}