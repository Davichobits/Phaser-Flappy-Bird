import Phaser from "phaser";

export class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 2];
    this.fontSize = 32;
    this.lineHeight = 42;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: '#FFF',
    }
  }

  create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    console.log(this.config)
    if (this.config.canGoBack) {
      const backButton = this.add.image(this.config.width - 16, this.config.height - 16, 'back').setOrigin(1).setInteractive()

      backButton.on('pointerup', () => {
        this.scene.start('MenuScene')
      })
    }
  }
  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach(menuItem => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY]
      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    })
  }
}