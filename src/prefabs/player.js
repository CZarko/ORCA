class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene,x,y) {
        super(scene,x,y,'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // anim config for player
        /*scene.anims.create({
            key: 'running',
            frames: this.anims.generateFrameNumbers('playerRun', {start:0, end:10, first: 0}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'hurt',
            frames: this.anims.generateFrameNumbers('playerHurt', {start:0, end:4, first: 0}),
            frameRate: 10
        });
        scene.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('playerJump', {start:0, end:10, first: 0}),
            frameRate: 10
        });

        // anim flags
        this.animNum = 0;
        this.animInit = false;*/
        
        this.lives = 1;

        this.jumpPower = 250;

        //player jump loifuq?
        this.body.setImmovable(true);
        this.body.gravity.y = 500;
        //this.body.collideWorldBounds = true;
        /*scene.input.on('pointerdown', () => {
            this.jumpTimer = scene.time.addEvent({
                delay: 100,
                callback: () => {
                    if(this.jumpPower < 5)
                        this.jumpPower += .1;
                },
                callbackScope: this,
                loop: true
            });
        }, this);*/
        scene.input.on('pointerup', () => {
            //scene.time.removeEvent(this.jumpTimer);
            //this.setVelocityY(-this.jumpPower * 100);
            //this.jumpPower = 0;
            this.setVelocityY(-this.jumpPower);
            //this.sound.play('jump-sfx');
        }, this);

        scene.events.on('update', this.update, this);
    }

    update(){
        /*if(!this.animInit) {
            switch(this.animNum) {
                case 0:
                    this.anims.play('running');
                    break;
                case 1:
                    this.anims.play('jump');
                    break;
                case 2:
                    this.anims.play('hurt');
                    this.on('animationcomplete', () => {
                        this.animNum = 0;
                        this.animInit = false;
                    });
                    break;
            }
            this.animInit = true;
        }*/
        //if space key pressed, set player y velocity to -100
    }
}