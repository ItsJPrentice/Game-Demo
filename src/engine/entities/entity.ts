import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { CollisionDetector } from 'engine/collisions/collisionDetector';
import { Collision } from 'engine/collisions/collision';

export class Entity {
  
  readonly id: string;
  protected _displayObject: PIXI.DisplayObject;
  protected _collisionDetector: CollisionDetector;
  public isSolid: boolean;

  constructor(isSolid?: boolean) {
    this.id = UUID.v4();
    this.isSolid = !!isSolid;
  }

  public get displayObject(): PIXI.DisplayObject {
    return this._displayObject;
  }

  public set collisionDetector(collisionDetector: CollisionDetector) {
    this._collisionDetector = collisionDetector;
    this._collisionDetector.addStaticEntity(this);
  }

  public collide(collision: Collision): void {
    this._onCollision(collision);
  }

  protected _onCollision(collision: Collision): void { }

  public update(): void {
  }

}