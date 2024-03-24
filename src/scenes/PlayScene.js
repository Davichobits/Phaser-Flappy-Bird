import { BaseScene } from './BaseScene';

const PIPES_TO_RENDER = 100;

export class Playscene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

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
  create() {
    super.create();
    this.createBird();
    this.createPipes();
    this.createColliders();
    this.createScore();
    this.handleInputs();
    this.createFullscreenButton();
    this.createPauseBtn();
  }
  update() {
    this.checkGameStatus()
    this.recyclePipes()
  }



  createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird').setOrigin(0);
    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe').setImmovable(true).setOrigin(0);
      this.placePipe(upperPipe, lowerPipe)
    }

    this.pipes.setVelocityX(-200);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this)
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown-SPACE', this.flap, this);
  }

  createFullscreenButton() {
    const button = this.add.image(this.config.width - 16, this.config.height - 16, 'fullscreen').setScale(0.1).setOrigin(1).setInteractive();
    button.on('pointerup', function () {

      if (this.scale.isFullscreen) {
        button.setFrame(0);

        this.scale.stopFullscreen();
      }
      else {
        button.setFrame(1);

        this.scale.startFullscreen();
      }

    }, this);
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right < 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();
          this.setBestScore();
        }
      }
    })
  }

  placePipe(uPipe, lPipe) {
    const rightMostX = this.getRightMostPipe();
    const pipesVerticalDistance = Phaser.Math.Between(...this.pipesDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(20, this.config.height - 20 - pipesVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...this.pipesHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipesVerticalDistance;
  }

  flap() {
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xEE4824);

    this.setBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.scene.restart();
      },
      loop: false
    })
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver()
    }
  }

  getRightMostPipe() {
    let rightMost = 0;
    this.pipes.getChildren().forEach(pipe => {
      rightMost = Math.max(pipe.x, rightMost);
    })
    return rightMost
  }

  setBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000' });
    this.bestScoreText = this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' });
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  createPauseBtn() {
    const pauseBtn = this.add.image(this.config.width - 16, 16, 'pause', 0).setScale(6).setOrigin(1, 0).setInteractive();
    pauseBtn.on('pointerup', function () {
      this.physics.pause();
      this.scene.pause();
      this.scene.start('MenuScene')
    }, this);
  }

}

