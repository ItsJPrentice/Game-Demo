import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { IVelocity } from 'engine/entities/actor.entity';
import { Collision } from './collision';
import { ContactCache } from './contact.cache';

export class CollisionDetector {

  private _static = <Entity[]>[];
  private _dynamic = <Entity[]>[];
  private _controlled = <Entity[]>[];
  private _contactCache = new ContactCache();

  constructor() { }

  /*
  public checkCollisions(): void {
    _.each(this._actors, this._checkActor.bind(this));
  }
  
  private _checkActor(actor: Actor, index: number): void {
    _.each(_.slice(this._actors, index + 1),
           actor2 => this._checkEntityCollision(actor, actor2));
    _.each(this._props,
           prop => this._checkEntityCollision(actor, prop));
    _(this._fixtures).filter(fixture => fixture.isSolid).each(
           fixture => this._checkEntityCollision(actor, fixture));
  }
  */

  public addStaticEntity(entity: Entity): void {
    this._static.push(entity);
  }
  
  public addDynamicEntity(entity: Entity): void {
    this._dynamic.push(entity);
  }
  
  public addControlledEntity(entity: Entity): void {
    this._controlled.push(entity);
  }

  private _checkEntityCollision(entity1: Entity, entity2: Entity): void {
    if (this._testIntersection(entity1.displayObject.getBounds(), entity2.displayObject.getBounds())) {
      this._onEntityCollision(entity1, entity2);
    } else {
      this._tryClearCollision(entity1, entity2);
    }
  }

  private _testIntersection(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return !(
             (r2.x >= (r1.x + r1.width))  ||
             ((r2.x + r2.width) <= r1.x)  ||
             (r2.y >= (r1.y + r1.height)) ||
             ((r2.y + r2.height) <= r1.y)
            );
  }
  
  private _onEntityCollision(entity1: Entity, entity2: Entity): void {
    if (this._contactCache.hasContact(entity1.id, entity2.id)) {
      entity1.collide(new Collision(entity2, 'ongoing'));
      entity2.collide(new Collision(entity1, 'ongoing'));
    } else {
      this._contactCache.setContact(entity1.id, entity2.id);
      entity1.collide(new Collision(entity2, 'hit'));
      entity2.collide(new Collision(entity1, 'hit'));
    }
  }
  
  private _tryClearCollision(entity1: Entity, entity2: Entity): void {
    if (this._contactCache.hasContact(entity1.id, entity2.id)) {
      this._contactCache.resetContact(entity1.id, entity2.id);
      entity1.collide(new Collision(entity2, 'end'));
      entity2.collide(new Collision(entity1, 'end'));
    }
  }

  private _getSolids(): PIXI.Rectangle[] {
    let solids =  _.concat(this._controlled, this._dynamic, this._static)
                   .filter(entity => entity.isSolid)
                   .map(entity => entity.displayObject.getBounds());
    return solids;
  }

  public getMaxVelocity(hitbox: PIXI.Rectangle, velocity: IVelocity): IVelocity {
    let maxVelocity: IVelocity = { x: 0, y: 0 },
        solids = this._getSolids();
    maxVelocity.x = velocity.x !== 0 ? this._getMaxAxisVelocity(hitbox, 'x', velocity.x, solids) : 0;
    maxVelocity.y = velocity.y !== 0 ? this._getMaxAxisVelocity(hitbox, 'y', velocity.y, solids) : 0;
    return maxVelocity;
  }

  private _getMaxAxisVelocity(hitbox: PIXI.Rectangle, axis: 'x' | 'y', v: number, solids: PIXI.Rectangle[]): number {
    let testHitbox = hitbox.clone(),
        hasIntersection = false,
        isDesc = v > 0;
    testHitbox[axis] += v;
    _.each(solids, solid => {
      if (this._testIntersection(testHitbox, solid)) {
        console.log(testHitbox, solid);
        isDesc ? v-- : v++;
        hasIntersection = true;
        return false;
      } return true;
    });
    return (!hasIntersection || v === 0) ? v : this._getMaxAxisVelocity(hitbox, axis, v, solids);
  }
}