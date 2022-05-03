class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        // Game Flags
        this.gameOver = false;
        this.restartGame = false;
        this.planeSpawning = false;

        this.playerIFrames = true;

        // Game Score
        this.score = 0;

        // BG Sprites
        this.bgBack = this.add.sprite(0,0,'bg-back').setOrigin(0);
        this.bgFront = this.add.sprite(0,0,'bg-front').setOrigin(0);

        // Creation of clouds array and init call to spawnCloud func
        this.clouds = [];
        this.spawnCloud();

        // Displays current score (Time Survived)
        this.scoreText = this.add.text(xCentered, yCentered, this.score, {fontFamily: 'primaryFont', fontSize: '200px', align: 'right', color: '#FBFBFF', fixedWidth: 910}).setOrigin(0.5);
        // Updates score after 1 second delay
        this.clock = this.time.delayedCall(1000, () => {
            this.updateScore();
        }, null, this);

        this.buildings = [];
        //Create background tile sprite
        let tmp = this.add.tileSprite(0,game.config.height-477,game.config.width,477,'back-building').setOrigin(0);
        this.buildings.push(tmp);
        //Create middle ground tile sprite
        tmp = this.add.tileSprite(0,game.config.height-215,game.config.width,215,'mid-building').setOrigin(0);
        this.buildings.push(tmp);
        //Create foreground tile sprite
        tmp = this.add.tileSprite(0,game.config.height-146,game.config.width,146,'fore-building').setOrigin(0);
        this.buildings.push(tmp);

        //Player Sprite
        this.player = new Player(this, hPadding*2, yCentered, 'player');
        
        // Creation of planes array and init call to spawnPlane func
        this.planes = [];
        this.spawnPlane();

        // SHHHHHHHHHH... no one needs to know
        this.input.keyboard.on('keydown-'+'P', () => {
            this.spawnPlane();
        });

        // animation config for explosion
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 13, first: 0}),
            frameRate: 30
        });

        // Displays end of game Text
        this.gameOverText = this.add.text(game.config.width/2, game.config.height/2, 'Game Over', {fontFamily: 'primaryFont', fontSize: '64px', color: '#C41E3A'}).setOrigin(0.5);
        this.gameOverText.setShadow(0,5,'rgba(0,0,0,1)',0);
        this.gameOverText.setVisible(false);
    
        // Displays game reset text
        this.restartText = this.add.text(game.config.width/2, game.config.height/2+vPadding/2, 'Click to Restart or press ESC for Menu',  {fontFamily: 'primaryFont', fontSize: '32px', color: '#FBFBFF'}).setOrigin(0.5);
        this.restartText.setShadow(0,5,'rgba(0,0,0,1)',0);
        this.restartText.setVisible(false);

        // Esc key returns player to menu
        this.input.keyboard.on('keydown-'+'ESC', () => {
            this.scene.start('Menu');
        });

        this.anims.create({
            key: 'click',
            frames: this.anims.generateFrameNumbers('clicker', {start: 0, end: 4, first: 0}),
            frameRate: 7,
            repeat: -1
        });
        this.clicker = this.add.sprite(vPadding, vPadding,'clicker').setScale(0.1).setOrigin(0.5);
        this.clicker.anims.play('click');
        this.time.delayedCall(5000, () => {
            this.clicker.destroy();
        }, null, this);
    }
    
    update() {
        //tween player rotation dependent on y-velocity
        this.tweens.add({targets: this.player, rotation: Math.atan2(this.player.body.velocity.y, 0)/4, ease: 'Exponential', duration: 200});

        if(this.playerIFrames) {
            this.player.invulnerable = true;
            this.tweens.add({targets: this.player, alpha: {from: 1, to: 0}, ease: 'Sine.easeInOut', duration: 500, repeat: 4, yoyo: true, onComplete: () => {
                this.player.invulnerable = false;
            }});
            this.playerIFrames = false;
        }

        //check if player has touched edges of game screen and if so end game
        if(this.player.body.checkWorldBounds()){
            this.gameOver = true;
        }

        if(!this.gameOver) {
            //parallaxing background
            for(let i = 0; i < this.buildings.length; ++i)
                this.buildings[i].tilePositionX += 1 + i*2;
            
            //If plane hits left side of screen, disappear
            for(let plane of this.planes) {
                if(plane.x < 0) {
                    this.destroyPlane(plane);
                }
            }
        } else {
            this.gameOverScreen();
        }

        // On restart, reset score and begin plane spawning
        if(this.restartGame) {
            this.score = 0;

            for(let plane of this.planes) {
                this.destroyPlane(plane);
            }
            if(!this.planeSpawning) {
                this.spawnPlane();
            }

            this.restartGame = false;
        }

        for(let cloud of this.clouds) {
            if(cloud.x < -game.settings.width*2) {
                let c = cloud;
                this.clouds.pop(cloud);
                c.destroy();
            }
        }
       
        this.scoreText.text = this.score;
    }

    spawnCloud() {
        this.clouds.push(new Cloud(this, Phaser.Math.Between(125,game.config.height-100)));
        this.time.delayedCall(Phaser.Math.Between(game.settings.planeSpawnRate.min/2,game.settings.planeSpawnRate.max/2), () => {
            this.spawnCloud();
        }, null, this);
    }

    //Spawns the planes flying towards the players
    spawnPlane() {
        this.planeSpawning = false;
        this.planes.push(new Plane(this, Phaser.Math.Between(50, 470)));
        if(!this.gameOver) {
            this.planeSpawning = true;
            this.time.delayedCall(Phaser.Math.Between(game.settings.planeSpawnRate.min,game.settings.planeSpawnRate.max), () => {
                this.spawnPlane();
            }, null, this);
        }
    }

    // Removes plane from planes array and destroy's their game object
    destroyPlane(plane) {
        this.planes.pop(plane);
        plane.destroy();
    }

    //Checks to see if the player has touched a plane
    crash() {
        this.player.alpha = 0;
        this.player.body.enable = false;
        let explosion = this.add.sprite(this.player.x, this.player.y, 'explosion').setOrigin(0.5,0.5);
        explosion.setScale(4);
        explosion.anims.play('explode');
        explosion.on('animationcomplete', () => {
            explosion.destroy();
        });
        //Plays sound effect upon crashing
        //this.sound.play('crash-sfx');
    }

    // Recursively updates score on delay
    updateScore() {
        if(!this.gameOver) {
            this.score++;
        }
        this.clock = this.time.delayedCall(1000, () => {
            this.updateScore();
        }, null, this); 
    }

    // Displays the game over screen
    gameOverScreen() {
        this.gameOverText.setVisible(true);
        this.restartText.setVisible(true);
        //Check if the player's score is the new highscore
        if(this.score > game.settings.highscore)
            game.settings.highscore = this.score;
        this.input.once('pointerup', () => {
            this.gameOverText.setVisible(false);
            this.restartText.setVisible(false);
            this.gameOver = false;

            //Respawns player back in the middle of the screen
            this.player.y = yCentered;
            this.player.alpha = 1;
            this.player.body.enable = true;

            this.playerIFrames = true;
            this.restartGame = true;
        });
    }
}