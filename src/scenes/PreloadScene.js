import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
    this.bird = null;
    this.pipes = null;
    this.pipesDistanceRange = [150, 250];
    this.pipesHorizontalDistanceRange = [500, 600];
    this.pipeHorizontalDistance = 0;
    this.flapVelocity = 150;
    this.score = 0;
    this.scoreText = '';
    this.bestScoreText = '';
  }
  preload() {
    this.load.image('sky', 'assets/Layers/sky.png');
    this.load.spritesheet('bird', 'assets/birdSprite.png', {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('cloud', 'assets/Layers/cloud_lonely.png')
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png')
    this.load.image('fullscreen', 'assets/zoomout.png');
    this.load.bitmapFont('atari', 'assets/bitmap/atari-smooth.png', 'assets/bitmap/atari-smooth.xml');
    this.load.bitmapFont('azoFire', 'assets/bitmap/azo-fire.png', 'assets/bitmap/azo-fire.xml');
  }
  create() {
    this.scene.start('MenuScene')
  }


}

