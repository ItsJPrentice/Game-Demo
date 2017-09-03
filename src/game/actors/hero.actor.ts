import * as PIXI from 'pixi.js';
import { Actor } from '../../engine/entities/actor.entity';

export class Hero extends Actor {

  constructor() {
    super();
    this.displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['token1.png']);
  }

  protected _action(): void {
    this.displayObject.rotation += .1;
  }

}