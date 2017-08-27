import * as PIXI from 'pixi.js';
import { SpriteService } from '../services/sprite.service';

export class Stage {

  protected _container: PIXI.Container;

  constructor() { }

  public get container(): PIXI.Container {
    return this._container;
  }

  protected _init(): void {
  }

  public update(): void {
  }
}