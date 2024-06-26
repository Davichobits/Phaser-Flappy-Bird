import { BaseScene } from './BaseScene';

const PIPES_TO_RENDER = 100;

export class Playscene extends BaseScene {
  constructor(config) {
    super('PlayScene', config);

    // UI
    this.bird = null;
    this.pipes = null;
    this.clouds = null;
    this.montains1 = null;
    this.montains2 = null;
    this.montains3 = null;
    this.cloudsback = null;
    this.cloudsfront = null;

    // Parallax speed
    this.mountainsSpeed = 0.1;

    this.isPaused = false;

    this.pipeHorizontalDistance = 0;
    this.flapVelocity = 300;

    this.score = 0;
    this.scoreText = '';

    this.currentDifficulty = 'easy';
    this.difficulties = {
      'easy': {
        pipeHorizontalDistanceRange: [300, 350],
        pipeVerticalDistanceRange: [150, 200]
      },
      'normal': {
        pipeHorizontalDistanceRange: [280, 330],
        pipeVerticalDistanceRange: [140, 190]
      },
      'hard': {
        pipeHorizontalDistanceRange: [250, 310],
        pipeVerticalDistanceRange: [50, 150]
      }
    }
  }

  create() {
    this.currentDifficulty = 'easy';
    super.create();
    this.createMountains();
    this.createBird();
    this.createPipes();
    this.createClouds();
    this.createColliders();
    this.createScore();
    this.createPause();
    this.handleInputs();
    this.listenToEvents();
    this.createFullscreenButton();
    this.animateBird();
  }

  createMountains() {
    this.montains1 = this.add.image(0, 0, 'glacial_montains').setOrigin(0).setScale(3);
    this.montains2 = this.add.image(384, 0, 'glacial_montains').setOrigin(0).setScale(3);
    this.montains3 = this.add.image(768, 0, 'glacial_montains').setOrigin(0).setScale(3);
  }

  animateBird() {
    // Verificar si la animación ya existe
    if (!this.anims.exists('fly')) {
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
    } else {
      // Si existe, eliminarla y crearla nuevamente
      this.anims.remove('fly');
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers('bird', { start: 8, end: 15 }),
        frameRate: 12,
        repeat: -1
      });
    }
    this.bird.play("fly")
  }


  listenToEvents() {
    if (this.pauseEvent) { return; }

    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(...this.screenCenter, 'Fly in: ' + this.initialTime, this.fontOptions).setOrigin(0.5);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true
      })
    })
  }

  countDown() {
    this.initialTime--;
    this.countDownText.setText('Fly in: ' + this.initialTime);
    if (this.initialTime <= 0) {
      this.isPaused = false;
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }

  createBG() {
    this.add.image(0, 0, 'sky').setOrigin(0);
  }

  createBird() {
    this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
      .setFlip(true)
      .setScale(3)
      .setOrigin(0);

    this.bird.setBodySize(this.bird.width - 1, this.bird.height - 8);
    this.bird.body.gravity.y = 600;
    this.bird.setCollideWorldBounds(true);
  }

  createPipes() {
    this.pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
      const upperPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setScale(4)
        .setOrigin(0, 1);
      const lowerPipe = this.pipes.create(0, 0, 'pipe')
        .setImmovable(true)
        .setScale(4)
        .setOrigin(0, 0);

      this.placePipe(upperPipe, lowerPipe)
    }

    this.pipes.setVelocityX(-200);
  }

  createClouds() {
    this.clouds1 = this.add.sprite(0, this.config.height, 'clouds2').setScale(3).setOrigin(0, 1);
    this.add.sprite(0, this.config.height, 'clouds1').setScale(3).setOrigin(0, 1);
  }

  createColliders() {
    this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.bitmapText(16, 36, 'atari', `Score: ${0}`, 80).setOrigin(0, 1).setRightAlign();
    this.scoreText.setFontSize(this.scoreText.fontSize / 4)
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' });
  }

  createPause() {
    this.isPaused = false;
    const pauseButton = this.add.image(this.config.width - 20, 75, 'pause')
      .setInteractive()
      .setScale(4)
      .setOrigin(1);

    pauseButton.on('pointerdown', () => {
      this.isPaused = true;
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
    })
  }

  handleInputs() {
    this.input.on('pointerdown', this.flap, this);
    this.input.keyboard.on('keydown_SPACE', this.flap, this);
  }

  checkGameStatus() {
    if (this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0) {
      this.gameOver();
    }
  }

  placePipe(uPipe, lPipe) {
    const difficulty = this.difficulties[this.currentDifficulty];
    const rightMostX = this.getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    const pipeVerticalPosition = Phaser.Math.Between(0 + 20, this.config.height - 20 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPosition;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance
  }

  recyclePipes() {
    const tempPipes = [];
    this.pipes.getChildren().forEach(pipe => {
      if (pipe.getBounds().right <= 0) {
        tempPipes.push(pipe);
        if (tempPipes.length === 2) {
          this.placePipe(...tempPipes);
          this.increaseScore();
          this.saveBestScore();
          this.increaseDifficulty();
        }
      }
    })
  }

  increaseDifficulty() {
    if (this.score === 1) {
      this.currentDifficulty = 'normal';
    }

    if (this.score === 3) {
      this.currentDifficulty = 'hard';
    }
  }

  getRightMostPipe() {
    let rightMostX = 0;

    this.pipes.getChildren().forEach(function (pipe) {
      rightMostX = Math.max(pipe.x, rightMostX);
    })

    return rightMostX;
  }

  saveBestScore() {
    const bestScoreText = localStorage.getItem('bestScore');
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);

    if (!bestScore || this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }
  }

  gameOver() {
    this.physics.pause();
    this.bird.setTint(0xEE4824);
    this.mountainsSpeed = 0;

    this.saveBestScore();

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.mountainsSpeed = 0.1;
        this.scene.restart();
      },
      loop: false
    })
  }

  flap() {
    if (this.isPaused) { return; }
    this.bird.body.velocity.y = -this.flapVelocity;
  }

  increaseScore() {
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`)
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

  update() {
    this.checkGameStatus();
    this.recyclePipes();
    // this.moveClouds();
    this.moveMontains();
  }
  // moveClouds() {
  //   this.clouds1.x -= 1;
  //   this.clouds2.x -= 1;
  // }
  moveMontains() {
    this.montains1.x -= this.mountainsSpeed;
    this.montains2.x -= this.mountainsSpeed;
    this.montains3.x -= this.mountainsSpeed;
  }

}

