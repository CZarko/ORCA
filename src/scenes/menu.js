class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.bg = this.add.sprite(0,0,'menu-bg').setOrigin(0);

        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }
}