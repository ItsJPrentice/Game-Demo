import * as PIXI from 'pixi.js';
import { AssetsManifestLoader } from 'game/utilities/assetsManifest.loader';
import { LoopService } from 'engine/services/loop.service';
import { Stage } from 'engine/entities/stage.entity';
import { DefaultStage } from 'game/stages/default.stage';
import { GamepadInputs } from 'engine/inputs/gamepad.inputs';
import { KeyboardInputs } from 'engine/inputs/keyboard.inputs';

export class Game {

  private _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
  private _stage: Stage;
  private _ticker: PIXI.ticker.Ticker;

  constructor() {
    new GamepadInputs();
    new KeyboardInputs();
    let loader = new AssetsManifestLoader();
    loader.loadAssetsFromManifest('/sprite-assets-manifest.json', this._onAssetsLoaded.bind(this));
  }

  private _onAssetsLoaded(): void {
    this._setupRenderer();
    this._stage = new DefaultStage();
    LoopService.loop.subscribe(delta => this._update(delta));
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

  private _update(deltaTime: number): void {
    this._stage.update(deltaTime);
    this._renderer.render(this._stage.displayObject);
  }

}