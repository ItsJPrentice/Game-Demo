import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

export class Floor extends Fixture {

  constructor(width: number, height: number) {
    super();
    this._addSprite(width, height);
  }

  protected _addSprite(width: number, height: number): void {
    let sprite = new PIXI.extras.TilingSprite(PIXI.utils.TextureCache['sprites/floor.png']);
    sprite.width = width;
    sprite.height = height;
    this.container.addChild(sprite);
  }

}