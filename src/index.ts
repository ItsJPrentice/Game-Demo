import * as PIXI from 'pixi.js';
import { AssetsService } from './services/assets.service';
import { LoopService } from './services/loop.service';
import { Stage } from './stages/stage';
import { DefaultStage } from './stages/default.stage';

const AppStyles = require('./assets/styles/styles.scss');

class Demo {

  private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private _stage: Stage;

  constructor() {
    AssetsService.loadAssets(this._onAssetsLoaded.bind(this));
  }

  private _onAssetsLoaded(): void {
    this._setupRenderer();
    this._stage = new DefaultStage();
    LoopService.gameLoop.subscribe(() => this._update());
  }

  private _setupRenderer(): void {
    let config: PIXI.RendererOptions = {
      antialias: false,
      transparent: false,
      resolution: 1
    }
    this._renderer = PIXI.autoDetectRenderer(256, 256, config);
    document.body.appendChild(this._renderer.view);
  }

  private _update(): void {
    this._renderer.render(this._stage.container);
  }

}

new Demo();