import * as PIXI from 'pixi.js';
import { TilingFixture } from 'engine/entities/tilingFixture.entity';

export class Wall extends TilingFixture {

  constructor(width: number, height: number, isSolid?: boolean) {
    super(new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/wall.png']),
          width, height, !!isSolid);
  }

}