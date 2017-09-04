import * as PIXI from 'pixi.js';
import { AssetsManifestLoader } from './utilities/assetsManifest.loader';
import { Stage } from '../engine/entities/stage.entity';
import { DefaultStage } from './stages/default.stage';

const AppStyles = require('./_assets/styles/styles.scss');

export class Game {

  private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private _stage: Stage;
  private _ticker: PIXI.ticker.Ticker;

  constructor() {
    let loader = new AssetsManifestLoader();
    loader.loadAssetsFromManifest('/sprite-assets-manifest.json', this._onAssetsLoaded.bind(this));
  }

  private _onAssetsLoaded(): void {
    this._setupRenderer();
    this._stage = new DefaultStage();
    this._ticker = new PIXI.ticker.Ticker();
    this._ticker.add(this._update.bind(this));
    this._ticker.start();
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
    this._stage.update();
    this._renderer.render(this._stage.displayObject);
  }

}