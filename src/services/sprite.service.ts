import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { AssetsService } from './assets.service';

interface ISpriteCollection {
  [name: string]: PIXI.Sprite
}

export class SpriteService {

  private constructor() { }

  private static _Sprites: ISpriteCollection = {
    background: null,
    token1: null,
    token2: null,
    token3: null
  }

  public static get Sprites(): ISpriteCollection {
    return this._Sprites;
  }

  public static generateSprites(): void {
    _.map(this._Sprites, (sprite: PIXI.Sprite, name: string) => {
      this._Sprites[name] = new PIXI.Sprite(PIXI.utils.TextureCache[name]);
    });
  }

}