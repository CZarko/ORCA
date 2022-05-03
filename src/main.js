/*
Collaborators: Alan L, Jesus N, Caleb Z, Kaeden Y
Game Title: I Believe I Can Orca
Date of Completion: 5/2/2022
Creative Tilt Justification:
We added some atmosphere to the game by spawning clouds with purely aesthetic functionality.
An array was used to keep track of all of the clouds, and a separate array was used to keep track of all of the planes present on the screen.
To keep track of the score, we used a recursive function to decrease the amount of code that needed to be written.
We are also proud of the art style of the game, as well as the concept of a flying orca trying to avoid air traffic.
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