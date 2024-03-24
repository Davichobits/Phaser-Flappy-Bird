import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 400,
  height: 300,
  physics:{
    default: 'arcade'
  },
  scene: {
    preload,
    create
  },
}

function preload() {
  if(this.load){

    this.load.image('sky', 'assets/sky.png');
  }
}

function create(){
  // x
  // y
  // key of the image
  this.add.image(0,0,'sky')
}

config.scene.preload()

new Phaser.Game(config);