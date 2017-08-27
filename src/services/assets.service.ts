import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { SpriteService } from './sprite.service';

const SpriteAssets = [ 'background', 'token1', 'token2', 'token3' ];

export class AssetsService {

  private constructor() { }

  public static loadAssets(callback: () => void): void {
    _.each(SpriteAssets, name => {
      PIXI.loader.add(name, require('../assets/images/' + name + '.png'));
    });
    PIXI.loader.load(() => { callback(); });
  }

}