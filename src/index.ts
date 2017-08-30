import * as PIXI from 'pixi.js';
import { AssetsService } from './services/assets.service';
import { RendererService } from './services/renderer.service';
import { GameLoopService } from './services/gameLoop.service';
import { Stage } from './stages/stage';
import { DefaultStage } from './stages/default.stage';
import { KeyboardService } from './services/keyboard.service';

const AppStyles = require('./assets/styles/styles.scss');

class Demo {

  private _stage: Stage;

  constructor() {
    AssetsService.loadAssets(this._onAssetsLoaded.bind(this));
  }

  private _onAssetsLoaded(): void {
    this._stage = new DefaultStage();
    GameLoopService.loop.subscribe(() => this._update());
  }

  private _update(): void {
    RendererService.renderer.render(this._stage.container);
  }

}

new Demo();