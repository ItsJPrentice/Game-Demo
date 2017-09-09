import * as PIXI from 'pixi.js';
import { Actor } from 'engine/entities/actors/actor.entity';

export class Monster extends Actor {

  constructor() {
    super();
    this._addSprite();
  }

  protected _addSprite(): void {
    let sprite = this._getSprite('sprites/token3.png');
    this.container.addChild(sprite);
  }

}