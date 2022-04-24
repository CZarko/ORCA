class Play extends Phaser.Scene {
    constructor() {
        super('Play');
    }
    
    create() {
        this.gameOver = false;
        this.player = new Player(this, xCentered, yCentered, 'player');

        //Platform Creator
        this.platformGroup = this.add.group({
            //once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformPool.add(platform)
            }
        });
        //pool
        this.platformPool = this.add.group({
            //once a platform is removed from the pool, it's added to the active platforms group
            removeCallback: function(platform){
                platform.scene.platformGroup.add(platform)
            }
        });
         

        //adding a platform to the game, the arguments are platform width and x position
        this.addPlatform(game.config.width, game.config.width / 2);
    }
    //Platform functions
    addPlatform(platformWidth, posX){
        let platform;
        if (this.platformPool.getLength()){
            platform = this.platformPool.getFirst();
            platform.x = posX;
            platform.active = true;
            platform.visible = true;
            thistory.platformPool.remove(platform);
        }
        else {
            platform = this.physics.add.sprite(posX, game.config.height * 0.8, 'platform');
            platform.setImmovable(true);
            platform.setVelocityX(platformOptions.platformStartSpeed * -1);
            this.platformGroup.add(platform);
        }
        platform.displayWidth = platformWidth;
        this.nextPlatformDistance = Phaser.Math.Between(platformOptions.spawnRange[0], platformOptions.spawnRange[1]);
    }

    update() {
        //check for player jump input
        if(!this.gameOver && !playerJump && Phaser.Input.Keyboard.JustDown(keySpace)){
            this.player.jump(this.jumpHeight);
        }
        //background always moving in one direction
        //background moving
        this.background.tilePositionX -= speed; //background moves at same speed as player
        
        //speed increases over time up to a cieling

        // check if the game has ended
        if(this.player.lives <= 0) { this.gameOver = true; this.gameOverScreen(); }

        //check if player is on pop-up platform and slow them down

        //Recycling Platforms
        let minDistance = game.config.width;

        this.platformGroup.getChildren().forEach(function(platform) {
            let platformDistance = game.config.width - platform.x - platform.displayWidth / 2,
            minDistance = Math.min(minDistance, platformDistance);
            if(platform.x < - platform.displayWidth / 2){
                this.platformGroup.killAndHide(platform);
                this.platformGroup.remove(platform);
            }
        }, this);

        //adding new platforms
        if(minDistance > this.nextPlatform){
            var nextPlatformWidth = Phaser.Math.Between(platformOptions.platformsSizeRange[0], platformOptions.platformSizeRange);
            this.addPlatform(nextPlatformWidth,game.config.width + nextPlatformWidth / 2);
        }
    }
    
    checkCollision(platform, player) {
        if(typeof platform == Popup){
            platform.slowDown(player);
        }
        //decrease player lives counet
        //decrease player speed
    }

    gameOverScreen() {
        let textConfig = {
            fontFamily: 'primaryFont', 
            fontSize: '32px',
            color: '#FBFBFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            }
        };
        let t = this.add.text(game.config.width/2, game.config.height/2, 'Gama Ovar', textConfig);
        t.setS
    }


}