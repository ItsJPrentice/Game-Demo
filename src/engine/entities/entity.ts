import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { Collision} from 'engine/collisions/collision';

export class Entity {
  
  readonly id: string;
  protected _displayObject: PIXI.DisplayObject;
  public isSolid: boolean;

  constructor(isSolid?: boolean) {
    this.id = UUID.v4();
    this.isSolid = !!isSolid;
  }

  public get displayObject(): PIXI.DisplayObject {
    return this._displayObject;
  }

  public collide(collision: Collision): void {
    this._onCollision(collision);
  }

  protected _onCollision(collision: Collision): void  { }

}