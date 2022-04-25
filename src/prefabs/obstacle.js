class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, isFlipped){
        super(scene, game.config.width + 64, y, 'obstacle');
        scene.add.existing(this);
        scene.physics.add.existing(this);

        if(isFlipped)
            this.flipY = true;

        this.body.setImmovable(true);
        this.setVelocityX(-scene.gameSpeed*100);
              
        scene.physics.add.collider(scene.player, this, () => {
            scene.gameOver = true;
            scene.crash();
        });
        //scene.time.delayedCall(5000 , () => { this.destroy(); }, null, scene);
    }
}