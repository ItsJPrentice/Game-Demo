import * as PIXI from 'pixi.js';
import { AssetsService } from './services/assets.service';
import { SpriteService } from './services/sprite.service';
import { RendererService } from './services/renderer.service';
import { KeyboardService } from './services/keyboard.service';
import { GameLoopService } from './services/gameLoop.service';
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
    this._stage = new DefaultStage();
    GameLoopService.loop.subscribe(() => this._update());
  }

  private _update(): void {
    RendererService.renderer.render(this._stage.container);
  }

}

new Samplin();