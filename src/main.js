/*
Collaborators: Alan L, Jesus N, Caleb Z, Kaeden Y
Game Title: I Believe I Can Orca
Date of Completion: 5/2/2022
Creative Tilt Justification: 
*/

const config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Load,Menu,Play]
}


// definition and assignment of Phaser game and game settings
const game = new Phaser.Game(config);
game.settings = {
    planeSpawnRate: {min: 1000, max: 3000},
    planeSpeed: {min: 5, max: 8},
    gravity: 500,
    jumpPower: 300,
    highscore: 0
};

// define game globals
let xCentered = game.config.width/2;
let yCentered = game.config.height/2;
let hPadding = game.config.width/8;
let vPadding = game.config.height/6;