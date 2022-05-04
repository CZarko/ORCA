class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setOrigin(0.5);

        this.invulnerable = false;
        
        // anim config for player
        scene.anims.create({
            key: 'swim',
            frames: scene.anims.generateFrameNames('player', {prefix: 'whale_swim_', suffix: '.png', end: 2}),
            frameRate: 8,
            repeat: -1
        });
        this.anims.play('swim');

        // player jump loifuq?
        this.body.setImmovable(true);
        this.body.setSize(this.width/2, this.height/4);
        this.body.gravity.y = game.settings.gravity;
        this.body.setDragY(game.settings.jumpPower/2);
        scene.input.on('pointerup', () => {
            this.setVelocityY(-game.settings.jumpPower);
            scene.sound.play('jump-sfx', {volume: 0.02});
        }, this);
        
        scene.events.on('update', this.update, this);
    }

    update(){
        // purposefully left empty
    }
}

