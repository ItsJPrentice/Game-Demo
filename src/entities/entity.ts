import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { SpriteService } from '../services/sprite.service';
import { Collision} from '../collisions/collision';

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

  public collide(collision: Collision): void {
    console.log(collision.type + ': ' + this.id + ' | ' + collision.entity.id);
  }

}