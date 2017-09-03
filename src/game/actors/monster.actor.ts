import * as PIXI from 'pixi.js';
import { Actor } from '../../engine/entities/actor.entity';

export class Monster extends Actor {

  constructor() {
    super();
    this.displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['token3.png']);
  }

}