import { BaseScene } from "./BaseScene";

export class MenuScene extends BaseScene {
  constructor(config) {
    super('MenuScene', config);
    this.menu = [
      { scene: 'PlayScene', text: 'Play' },
      { scene: 'ScoreScene', text: 'Score' },
      { scene: null, text: 'Exit' }
    ]
  }
  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this)); // (menuItem)=>setupMenuEvents(menuItem)
  }
  setupMenuEvents(menuItem) {
    let textGO = menuItem.textGO;
    textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#ff0' });
    })
    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#fff' })
    })
  }
}