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
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('fullscreen', 'assets/back.png');
  }
  create() {
    this.scene.start('MenuScene')
  }


}

