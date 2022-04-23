class Load extends Phaser.Scene {
    constructor() {
        super('Load');
    }

    preload() {
        //let loadingBar = this.add.graphics()

        this.load.path = './assets/';
        // load graphic assets
        this.load.image('sample', 'img/sample.png');
    }

    create() {
        this.scene.start("Menu");
    }
}