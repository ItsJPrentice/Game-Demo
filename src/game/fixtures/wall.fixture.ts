import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

export class Wall extends Fixture {
  
  constructor(width: number, height: number) {
    super();
    this.container.addChild(this._getTilingSprite('sprites/wall.png', width, height));
  }

}