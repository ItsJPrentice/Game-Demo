import * as PIXI from 'pixi.js';
import { AssetsService } from './services/assets.service';
import { SpriteService } from './services/sprite.service';
import { RendererService } from './services/renderer.service';
import { KeyboardService } from './services/keyboard.service';
import { Stage } from './stages/stage';
import { DefaultStage } from './stages/default.stage';

const AppStyles = require('./assets/styles/styles.scss');

class Samplin {

  private _stage: Stage;

  constructor() {
    AssetsService.loadAssets(this._onAssetsLoaded.bind(this));
    KeyboardService.init();
  }

  private _onAssetsLoaded(): void {
    SpriteService.generateSprites();
    this._stage = new DefaultStage();
    this._gameLoop();
  }

  private _gameLoop(): void {
    this._stage.update();
    RendererService.renderer.render(this._stage.container);
    window.requestAnimationFrame(this._gameLoop.bind(this));
  }

}

new Samplin();