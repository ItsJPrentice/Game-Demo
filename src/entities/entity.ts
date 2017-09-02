import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { Collision} from '../collisions/collision';

export class Entity {
  
  readonly id: string;
  protected _displayObject: PIXI.DisplayObject;

  constructor() {
    this.id = UUID.v4();
  }

  public get displayObject(): PIXI.DisplayObject {
    return this._displayObject;
  }

  public set displayObject(displayObject: PIXI.DisplayObject) {
    this._displayObject = displayObject;
  }

  public collide(collision: Collision): void {
    console.log(collision.type + ': ' + this.id + ' | ' + collision.entity.id);
  }

}