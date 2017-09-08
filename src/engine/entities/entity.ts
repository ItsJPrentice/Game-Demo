import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import { CollisionDetector } from 'engine/collisions/collisionDetector';
import { Collision } from 'engine/collisions/collision';

export class Entity {
  
  readonly id: string;
  protected _container = new PIXI.Container();
  // TODO: Refactor out into hitbox mixin
  // protected _collisionDetector: CollisionDetector;
  // public isSolid: boolean;

  constructor(isSolid?: boolean) {
    this.id = UUID.v4();
    
    // TODO: Refactor out into hitbox mixin
    // this.isSolid = !!isSolid;
  }

  public get container(): PIXI.Container {
    return this._container;
  }
  
  public update(deltaTime: number): void { }

  // TODO: Refactor out into hitbox mixin
  // public set collisionDetector(collisionDetector: CollisionDetector) {
  //   this._collisionDetector = collisionDetector;
  //   this._collisionDetector.addStaticEntity(this);
  // }

  // public collide(collision: Collision): void {
  //   this._onCollision(collision);
  // }

  // protected _onCollision(collision: Collision): void { }

}