import Phaser from "phaser";

const config = {
  // WebGL (Web Graphics Library)
  type: Phaser.AUTO, // Tipo de renderizado (WebGL, Canvas, etc)
  width: 800,
  height: 600,
  physics: {
    // Arcade physics plugin, manages physics simulation
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
      debug: true,
    }
  },
  scene: {
    preload,
    create,
    update
  },
}
// Loading assets, such as images, music, animations, etc.
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

let bird = null;
let totalDelta = null;
let flapVelocity = 250;

// Display on the screen
function create() {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(config.width * 0.1, config.height / 2, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap);
  this.input.keyboard.on('keydown-SPACE', flap);
}

// 60 fps
// 60 times per second
function update(time, delta){

}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

new Phaser.Game(config);



// Phaser.AUTO: Phaser intentará usar WebGL si está disponible en el navegador; de lo contrario, utilizará el renderizador de lienzo (Canvas). Esta opción es útil para aprovechar al máximo las capacidades de rendimiento del navegador.

// Phaser.WEBGL: Fuerza a Phaser a utilizar WebGL, independientemente de si está disponible o no. Puedes usar esta opción si deseas garantizar específicamente el uso de WebGL.

// Phaser.CANVAS: Fuerza a Phaser a utilizar el renderizador de lienzo (Canvas), incluso si WebGL está disponible. Esto puede ser útil si por alguna razón prefieres utilizar el renderizador de lienzo en lugar de WebGL.