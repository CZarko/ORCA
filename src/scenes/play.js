class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        this.gameOver = false;
        this.gameSpeed = 5;

        this.background = this.add.tileSprite(0,0,game.config.width, game.config.height, 'background').setOrigin(0,0);
        this.player = new Player(this, hPadding*2, yCentered, 'player');
        
        this.obstacles = [];
        this.spawnObstacle();

        // animation config for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 13, first: 0}),
            frameRate: 30
        });
    }

    update() {
        if(!this.gameOver) {
            //check for player jump input
        
            //background always moving in one direction
            //background moving
            this.background.tilePositionX += 5; //background moves at same speed as player
            
            //speed increases over time up to a cieling

            // check if player collided w/ edges of screen
            /*if(this.player.x == game.config.height || this.player.x == 0){
                this.gameOver = true;
                this.gameOverScreen();
            }*/
        } else {
            this.gameOverScreen();
        }
        if(this.player.body.checkWorldBounds()){
            this.gameOver = true;
        }
        //decrease player speed
    }

    spawnObstacle() {
        let gapY  = Phaser.Math.Between(vPadding, game.config.height - vPadding);        
        let gapHeight = Phaser.Math.Between(300, 500);

        let upperObj = new Obstacle(this, gapY - (game.config.height + gapHeight/2), true);
        let lowerObj = new Obstacle(this, gapY + (game.config.height + gapHeight/2), false);

        let spawn = this.time.delayedCall(Phaser.Math.Between(500,4000), this.spawnObstacle, null, this);
    }

    crash() {
        this.player.alpha = 0;
        let explosion = this.add.sprite(this.player.x, this.player.y, 'explosion').setOrigin(0.5,0.5);
        explosion.setScale(4);
        explosion.anims.play('explode');
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });
        //this.sound.play('crash-sfx');
    }

    gameOverScreen() {
        let textConfig = {
            fontFamily: 'primaryFont', 
            fontSize: '32px',
            color: '#FBFBFF',
        };
        let t = this.add.text(game.config.width/2, game.config.height/2, 'Game Over', textConfig).setOrigin(0.5);
        this.input.once('pointerup', () => {
            this.gameOver = false;
            this.player.alpha = 1;
        });
    }
}