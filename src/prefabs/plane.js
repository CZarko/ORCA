class Plane extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y){
        super(scene, game.config.width + 64, y, Phaser.Math.RND.pick(['jet-plane', 'big-plane'/*, 'fighter-jet'*/]));
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.body.setImmovable(true);
        this.setVelocityX(-(Phaser.Math.Between(game.settings.planeSpeed.min, game.settings.planeSpeed.max))*100);
              
        //Checks to see if the plane has collided with the player
        scene.physics.add.collider(scene.player, this, () => {
            scene.gameOver = true;
            scene.crash();
        });

        if(this.texture.key == 'fighter-jet') {
            this.body.setAcceleration(-500,0);
        }
    }
}