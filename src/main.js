// define and assign main Phaser game object config
const config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    scene: [Load, Menu, Play, GameOver]
}

// define and assing Phaser game
const game = new Phaser.Game(config);

// define game globals
let xCentered = game.config.width/2;
let yCentered = game.config.height/2;