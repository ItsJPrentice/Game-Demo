import * as PIXI from 'pixi.js';
import { AssetsManifestLoader } from './utilities/assetsManifest.loader';
import { LoopService } from '../engine/services/loop.service';
import { Stage } from '../engine/entities/stage.entity';
import { DefaultStage } from './stages/default.stage';

const AppStyles = require('./_assets/styles/styles.scss');

export class Game {

  private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private _stage: Stage;

  constructor() {
    let loader = new AssetsManifestLoader();
    loader.loadAssetsFromManifest('/sprite-assets-manifest.json', this._onAssetsLoaded.bind(this));
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
    this._renderer.render(this._stage.displayObject);
  }

}