import * as PIXI from 'pixi.js';
import { AssetsManifestLoader } from 'game/utilities/assetsManifest.loader';
import { Loop } from 'engine/loop/loop';
import { Stage } from 'engine/entities/stages/stage.entity';
import { DefaultStage } from 'game/stages/default.stage';
import { GamepadInputs } from 'engine/inputs/gamepad.inputs';
import { KeyboardInputs } from 'engine/inputs/keyboard.inputs';

export class Game {

  private _renderer: PIXI.Renderer;
  private _stage: Stage;
  private _ticker: PIXI.Ticker;

  constructor() {
    new GamepadInputs();
    new KeyboardInputs();
    let loader = new AssetsManifestLoader();
    loader.loadAssetsFromManifest('/sprite-assets-manifest.json', this._onAssetsLoaded.bind(this));
  }

  private _onAssetsLoaded(): void {
    this._setupRenderer();
    this._stage = new DefaultStage();
    new Loop().stream.subscribe(delta => this._update(delta));
  }

  private _setupRenderer(): void {
    this._renderer =  new PIXI.Renderer({
      antialias: false,
      height: 256,
      transparent: false,
      resolution: 1,
      width: 256
    });
    document.body.appendChild(this._renderer.view);
  }

  private _update(delta: number): void {
    this._stage.update(delta);
    this._renderer.render(this._stage.container);
  }

}