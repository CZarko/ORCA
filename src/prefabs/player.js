class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);

        this.invulnerable = false;
        
        // anim config for player
        /*scene.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNumbers('player-swim', {start:0, end:2, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('swim');*/

        // player jump loifuq?
        this.body.setImmovable(true);
        this.body.gravity.y = game.settings.gravity;
        this.body.setDragY(game.settings.jumpPower/2);
        scene.input.on('pointerup', () => {
            this.setVelocityY(-game.settings.jumpPower);
        }, this);
        
        scene.events.on('update', this.update, this);
    }

    update(){
        // purposefully left empty
    }
}

