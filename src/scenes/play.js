class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        this.gameOver = false;
        this.gameSpeed = 5;

        this.bg = this.add.sprite(0,0,'bg').setOrigin(0);
        this.buildings = [];
        let tmp = this.add.tileSprite(0,game.config.height-477,game.config.width,477,'back-building').setOrigin(0);
        this.buildings.push(tmp);
        tmp = this.add.tileSprite(0,game.config.height-215,game.config.width,215,'mid-building').setOrigin(0);
        this.buildings.push(tmp);
        tmp = this.add.tileSprite(0,game.config.height-146,game.config.width,146,'fore-building').setOrigin(0);
        this.buildings.push(tmp);

        this.player = new Player(this, hPadding*2, yCentered, 'player');
        
        this.obstacles = [];
        this.spawnObstacle();

        // animation config for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 13, first: 0}),
            frameRate: 30
        });

        let fixedWidth = 50;
        this.scoreText = this.add.text(game.config.width - fixedWidth, 50, game.settings.score, {fontFamily: 'primaryFont', fontSize: '64px', color: '#FBFBFF', fixedWidth: fixedWidth}).setOrigin(0.5);

        this.gameOverText = this.add.text(game.config.width/2, game.config.height/2, 'Game Over', {fontFamily: 'primaryFont', fontSize: '64px', color: '#FBFBFF'}).setOrigin(0.5);
        this.gameOverText.setVisible(false);
    
        this.restartText = this.add.text(game.config.width/2, game.config.height/2+vPadding/2, 'Click to Restart',  {fontFamily: 'primaryFont', fontSize: '32px', color: '#FBFBFF'}).setOrigin(0.5);
        this.restartText.setVisible(false);
    }

    update() {
        if(!this.gameOver) {
            //check for player jump input
        
            //background always moving in one direction
            //background moving
            for(let i = 0; i < this.buildings.length; ++i)
                this.buildings[i].tilePositionX += 1 + i*2; //background moves at same speed as player
            
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
        this.scoreText.text = game.settings.score;
    }

    spawnObstacle() {
        let gapY  = Phaser.Math.Between(vPadding, game.config.height - vPadding);        
        let gapHeight = Phaser.Math.Between(300, 500);

        let upperObj = new Obstacle(this, gapY - (game.config.height + gapHeight/2), true);
        let lowerObj = new Obstacle(this, gapY + (game.config.height + gapHeight/2), false);
        this.time.delayedCall(6000, () => {
            game.settings.score += 1;
            upperObj.destroy();
            lowerObj.destroy();
        }, null, this);

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
        this.gameOverText.setVisible(true);
        this.restartText.setVisible(true);
        this.input.once('pointerup', () => {
            this.gameOverText.setVisible(false);
            this.restartText.setVisible(false);
            this.gameOver = false;
            this.player.alpha = 1;
        });
    }
}