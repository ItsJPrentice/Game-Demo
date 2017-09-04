import * as PIXI from 'pixi.js';
import { TiledFixture } from 'engine/entities/tiledFixture.entity';

export class Wall extends TiledFixture {

  constructor(width: number, height: number) {
    super(
      new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/wall.png']),
      width,
      height,
      true
    );
  }

}