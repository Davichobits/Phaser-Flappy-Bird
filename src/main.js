import Phaser from 'phaser';
import { ScoreScene } from './scenes/ScoreScene';
import { PreloadScene } from './scenes/PreloadScene';
import { MenuScene } from './scenes/MenuScene';
import { Playscene } from './scenes/PlayScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {
    x: WIDTH * 0.1,
    y: HEIGHT / 2
}

const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    startPosition: BIRD_POSITION,
}

const Scenes = [PreloadScene, MenuScene, Playscene, ScoreScene];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    ...SHARED_CONFIG,
    scene: initScenes(),
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 400 },
            debug: true
        }
    }
};

new Phaser.Game(config);