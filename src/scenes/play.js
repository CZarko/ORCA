class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        let offset = -120;
        this.cameras.main.setBounds(offset*2,0,game.config.width + Math.abs(offset)*2, game.config.height);
        
        let bg = this.add.image(xCentered + offset, yCentered, 'sample');
        this.cameras.main.followOffset.x = 0;
    }

    update() {
        this.cameras.main.startFollow(game.input.mousePointer, true, 0.05, 0.05);
        
    }
}