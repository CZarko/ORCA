// define and assign main Phaser game object config
const config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: 0
            debug: false
        }
    },
    scene: [Load,Menu,Play]
}


// define and assing Phaser game
const game = new Phaser.Game(config);

// define game globals
let platformOptions = {
    platformStartSpeed: 350,
    spawnRange: [100, 350],
    platformSizeRange: [50, 250]
    //player gravity
    //jump force
}

let xCentered = game.config.width/2;
let yCentered = game.config.height/2;
let hPadding = game.config.width/8;
let vPadding = game.config.height/6;

// global key declarations
let keySpace;