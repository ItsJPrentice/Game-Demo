import * as PIXI from 'pixi.js';
import { Fixture } from '../../engine/entities/fixture.entity';

export class Background extends Fixture {

  constructor() {
    super();
    this.displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/background.png']);
  }

}