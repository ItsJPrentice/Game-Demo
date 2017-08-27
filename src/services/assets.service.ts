import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { SpriteService } from './sprite.service';

export class AssetsService {

  private static _areAssetsLoaded = false;

  private constructor() { }

  public static loadAssets(callback: () => void): void {
    _.each(SpriteService.Sprites, (sprite: PIXI.Sprite, name: string) => {
      PIXI.loader.add(name, require('../assets/images/' + name + '.png'));
    });
    PIXI.loader.load(() => { this._areAssetsLoaded = true; callback(); });
  }

}