import * as PIXI from 'pixi.js';
import { Actor } from 'engine/entities/actor.entity';

export class Monster extends Actor {

  constructor() {
    super(true);
    this._displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/token3.png']);
  }

}