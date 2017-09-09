import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

export class Floor extends Fixture {

  constructor(width: number, height: number) {
    super();
    this.container.addChild(this._getTilingSprite('sprites/floor.png', width, height));
  }

}