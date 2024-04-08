import { BaseScene } from "./BaseScene";

export class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' }
    ]
    this.title = 'Flappy Bird';
  }
  create() {
    super.create();
    // Titulo
    this.add.bitmapText(this.screenCenter[0], this.screenCenter[1] - 150, 'azoFire', this.title).setOrigin(0.5);

    this.createMenu(this.menu, this.setupMenuEvents.bind(this)); // (menuItem)=>setupMenuEvents(menuItem)
  }
  setupMenuEvents(menuItem) {
    let textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setFontSize(textGO.fontSize * 1.1);
    })
    textGO.on('pointerout', () => {
      textGO.setFontSize(textGO.fontSize / 1.1);
    })
    textGO.on('pointerup', () => {
      menuItem.scene && this.scene.start(menuItem.scene);

      if (menuItem.text === 'Exit') {
        document.exitFullscreen();
        this.game.destroy(true);
      }
    })
  }
}