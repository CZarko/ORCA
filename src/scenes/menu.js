class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.bg = this.add.sprite(0,0,'menu-bg').setOrigin(0);

        this.instructText = this.add.text(xCentered, game.config.height - vPadding*1.5, 'Click to Play', {fontFamily: 'primaryFont', fontSize: '75px', align: 'center', color: '#000000', fixedWidth: 910}).setOrigin(0.5);
        this.tweens.add({targets: this.instructText, alpha: {from: 1, to: 0}, ease: 'Sine.easeInOut', duration: 300, repeat: -1, yoyo: true});
        this.scoreText = this.add.text(xCentered, game.config.height - vPadding/2, 'highscore: ' + game.settings.highscore, {fontFamily: 'primaryFont', fontSize: '50px', align: 'center', color: '#000000', fixedWidth: 910}).setOrigin(0.5);
        

        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }
}