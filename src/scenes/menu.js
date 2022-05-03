class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        this.bg = this.add.sprite(0,0,'menu-bg').setOrigin(0).setScale(0.24);

        this.anims.create({
            key: 'click',
            frames: this.anims.generateFrameNumbers('clicker', {start: 0, end: 4, first: 0}),
            frameRate: 7,
            repeat: -1
        });
        let clicker = this.add.sprite(game.config.width - vPadding, game.config.height - vPadding,'clicker').setScale(0.1).setOrigin(0.5);
        clicker.anims.play('click');
        this.instructText = this.add.text(xCentered, game.config.height - vPadding*1.3, 'Click to Play', {fontFamily: 'primaryFont', fontSize: '75px', align: 'center', color: '#000000', fixedWidth: 910}).setOrigin(0.5);
        this.tweens.add({targets: this.instructText, alpha: {from: 1, to: 0}, ease: 'Sine.easeInOut', duration: 300, repeat: -1, yoyo: true});
        this.scoreText = this.add.text(xCentered, game.config.height - vPadding/2, 'highscore: ' + game.settings.highscore, {fontFamily: 'primaryFont', fontSize: '50px', align: 'center', color: '#000000', fixedWidth: 910}).setOrigin(0.5);
        
        


        this.input.on('pointerdown', () => {
            this.sound.play('select-sfx', {volume: 0.1});
            this.scene.start('Play');
        });
    }
}