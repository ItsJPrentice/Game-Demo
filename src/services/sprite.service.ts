import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { AssetsService } from './assets.service';

export class SpriteService {

  private constructor() { }

  public static getSprite(id: string): PIXI.Sprite {
    return new PIXI.Sprite(PIXI.utils.TextureCache[id]);;
  }

}