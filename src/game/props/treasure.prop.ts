import * as PIXI from 'pixi.js';
import { Prop } from '../../engine/entities/prop.entity';

export class Treasure extends Prop {

  constructor() {
    super();
    this.displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['token2.png']);
  }

}