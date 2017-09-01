import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { SpriteService } from '../services/sprite.service';

export class Entity {
  
  readonly id: string;
  protected _sprite: PIXI.Sprite;

  constructor(textureId?: string) {
    this.id = UUID.v4();
    if (textureId) this._sprite = SpriteService.getSprite(textureId);
  }

  public get sprite(): PIXI.Sprite {
    return this._sprite;
  }

}