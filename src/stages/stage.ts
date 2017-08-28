import * as PIXI from 'pixi.js';
import { SpriteService } from '../services/sprite.service';

export class Stage {

  protected _container = new PIXI.Container();

  constructor() { }

  public get container(): PIXI.Container {
    return this._container;
  }

}