import * as PIXI from 'pixi.js';
import { TiledFixture } from 'engine/entities/tiledFixture.entity';

export class Floor extends TiledFixture {

  constructor(width: number, height: number) {
    super(
      new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/floor.png']),
      width,
      height
    );
  }

}