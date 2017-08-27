import * as PIXI from 'pixi.js';

export class RendererService {

  private static _renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;

  private static _rendererWidth = 256;
  private static _rendererHeight = 256;
  private static _rendererConfiguration = {
    antialias: false,
    transparent: false,
    resolution: 1
  }

  private constructor() { }

  public static get renderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer {
    if (!this._renderer) this._renderer = PIXI.autoDetectRenderer(
      this._rendererWidth,
      this._rendererHeight,
      this._rendererConfiguration
    );
    document.body.appendChild(this._renderer.view);
    return this._renderer;
  }
}