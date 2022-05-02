class Cloud extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y){
        super(scene, game.config.width*2, y, Phaser.Math.RND.pick(['cloud-0','cloud-1']));
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.alpha = Phaser.Math.FloatBetween(0,1);
        if(this.alpha < 0.5)
            this.flipX = true;

        this.body.setImmovable(true);
        this.setVelocityX(-(Phaser.Math.Between(game.settings.planeSpeed.min, game.settings.planeSpeed.max))*Phaser.Math.Between(10, 50));
        this.setAccelerationX(-Phaser.Math.Between(0, 100));
    }
}