class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y){
        super(scene,x,y,'obstacle');
        scene.add.existing(this);
    }
    //slow player speed here?
    slowDown(player){
        player.speed -= 10; //adjust accordingly
    }
}