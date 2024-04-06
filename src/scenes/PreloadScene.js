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
    this.load.image('clouds1', 'assets/Layers/clouds_mg_1.png')
    this.load.image('clouds2', 'assets/Layers/clouds_mg_2.png')
    this.load.image('pause', 'assets/pause.png');
    this.load.image('back', 'assets/back.png')
    this.load.image('fullscreen', 'assets/zoomout.png');
    // fonts
    this.load.bitmapFont('atari', 'assets/bitmap/atari-smooth.png', 'assets/bitmap/atari-smooth.xml');
    this.load.bitmapFont('azoFire', 'assets/bitmap/azo-fire.png', 'assets/bitmap/azo-fire.xml');
    // Parallax
    this.load.image('glacial_montains', 'assets/Layers/glacial_mountains.png');
  }
  create() {
    this.scene.start('MenuScene')
  }


}

