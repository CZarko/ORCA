/*
Collaborators: Alan L, Jesus N, Caleb Z, Kaeden Y
Game Title: I Believe I Can Orca
Date of Completion: 5/2/2022
Creative Tilt Justification:
    Did we do something technically interesting? Sure. We experimented with arrays, arcade physics, ARCADE COLLIDERS (RAHHHHHHHHH),
    messed around with art and positioning of stuff that we thought would be most effective for player commmunication, etc.
    Largely, as one of the programmers, I incredibly enjoyed throwing my own music compositions into this. I even made the sound effects,
    and while programming side it wasn't complicated, one the largest challenges was figuring out how to get the sound effects to fit with
    the background music. It was a lot of changing the effect, resulting in ultimately simple sounds and altering volumes. Another thing
    that took us some time to figure out was the application of velocity to objects and not having those objects go FLYING on collision. We
    also tried to do some tweening in main.js and play.js. Also simplified input and having events happen on it compared to Rocket Patrol, you 
    can see this in menu.js and player.js easily. ALSO, there's a secret in play.js if you can find it.
    We are satisfied with how the assets came out and how they worked together. One clever combination was trying to make the sound effects kind of fit
    with the endless background music in a way. It wasn't complex in coding, but as aforementioned... it took work. Also when you first start... watch
    the bottom right.... 
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