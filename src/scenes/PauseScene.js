import { BaseScene } from "./BaseScene";

export class PauseScene extends BaseScene {
  constructor(config){
    super('PauseScene', config);

    this.menu = [
      {scene: 'PlayScene', text: 'Continue'},
      {scene: 'MenuScene', text: 'Exit'},
    ]
  }
  create(){
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem){
    let textGO = menuItem.textGO;
    textGO.setInteractive();
    textGO.on('pointerover', () => {
      textGO.setStyle({ fill: '#ff0' });
    });
    textGO.on('pointerout', () => {
      textGO.setStyle({ fill: '#fff' });
    });
    textGO.on('pointerup', () => {
      if(menuItem.scene && menuItem.text === 'Continue'){
        this.scene.resume(menuItem.scene);
        this.scene.stop();
      }
      if(menuItem.scene && menuItem.text === 'Exit'){
        this.scene.stop();
        this.scene.start(menuItem.scene);
      }
    });
  }
}