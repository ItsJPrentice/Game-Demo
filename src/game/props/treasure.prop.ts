import * as PIXI from 'pixi.js';
import { Prop } from 'engine/entities/props/prop.entity';

export class Treasure extends Prop {

  constructor() {
    super();
    this._addSprite();
  }

  protected _addSprite(): void {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/token2.png']);
    this.container.addChild(sprite);
  }

}