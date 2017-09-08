import * as PIXI from 'pixi.js';
import { Actor } from 'engine/entities/actors/actor.entity';

export class Monster extends Actor {

  constructor() {
    super();
    this._addSprite();
  }

  protected _addSprite(): void {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/token3.png']);
    this.container.addChild(sprite);
  }

}