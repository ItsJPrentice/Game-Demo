import * as PIXI from 'pixi.js';
import { TilingFixture } from 'engine/entities/tilingFixture.entity';

export class Floor extends TilingFixture {

  constructor(width: number, height: number) {
    super(
      new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/floor.png']),
      width,
      height
    );
  }

}