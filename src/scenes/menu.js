class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    create() {
        let textConfig = {
            fontFamily: 'primaryFont',
            fontSize: '80px',
            color: '#0CF574',
        }

        this.add.text(xCentered, yCentered-vPadding, 'Endless Runner ASG',textConfig).setOrigin(0.5);
        textConfig.fontSize = '60px';
        textConfig.color = '#FBFBFF';
        this.add.text(xCentered,game.config.height-vPadding, 'Click to START', textConfig).setOrigin(0.5);

        //Game Instructions
        textConfig.fontSize = '50px';
        textConfig.color = "#FF00FF"
        this.add.text(xCentered - 300, yCentered + 250, "Click Mouse 1 to jump", textConfig).setOrigin(0,5);



        this.input.on('pointerdown', () => {
            this.scene.start('Play');
        });
    }
}