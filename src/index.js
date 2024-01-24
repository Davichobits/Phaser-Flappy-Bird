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

// Display on the screen
function create() {
  this.add.image(0, 0, 'sky').setOrigin(0, 0);
  bird = this.physics.add.sprite(0,config.width / 2, 'bird').setOrigin(0,0);
  // bird.body.gravity.y = 200;
}

// 60 fps
// 60 times per second
function update(time, delta){
  if(totalDelta > 1000){
    console.log(bird.body.velocity.y);
    totalDelta = 0;
  }
  totalDelta += delta;
}

new Phaser.Game(config);



// Phaser.AUTO: Phaser intentará usar WebGL si está disponible en el navegador; de lo contrario, utilizará el renderizador de lienzo (Canvas). Esta opción es útil para aprovechar al máximo las capacidades de rendimiento del navegador.

// Phaser.WEBGL: Fuerza a Phaser a utilizar WebGL, independientemente de si está disponible o no. Puedes usar esta opción si deseas garantizar específicamente el uso de WebGL.

// Phaser.CANVAS: Fuerza a Phaser a utilizar el renderizador de lienzo (Canvas), incluso si WebGL está disponible. Esto puede ser útil si por alguna razón prefieres utilizar el renderizador de lienzo en lugar de WebGL.