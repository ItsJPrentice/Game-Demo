import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Entity } from 'engine/entities/entity';
import { Collision } from './collision';
import { ContactCache } from './contact.cache';

export class CollisionDetector {

  private _staticEntities = <Entity[]>[];
  private _dynamicEntities = <Entity[]>[];
  private _controlledEntities = <Entity[]>[];
  private _contactCache = new ContactCache();

  constructor() { }
  
  public checkCollisions(): void {
    _.each(this._controlledEntities, this._checkControlledEntities.bind(this));
    _.each(this._dynamicEntities, this._checkDynamicEntities.bind(this));
  }
  
  private _checkControlledEntities(entity: Entity, index: number): void {
    _.each(_.slice(this._controlledEntities, index + 1),
           controlledEntity => this._checkEntityCollision(entity, controlledEntity));
    _.each(this._dynamicEntities,
           dynamicEntity => this._checkEntityCollision(entity, dynamicEntity));
    _.each(this._staticEntities,
           staticEntity => this._checkEntityCollision(entity, staticEntity));
  }
  
  private _checkDynamicEntities(entity: Entity, index: number): void {
    _.each(_.slice(this._dynamicEntities, index + 1),
           dynamicEntity => this._checkEntityCollision(entity, dynamicEntity));
  }

  public addStaticEntity(entity: Entity): void {
    this._staticEntities.push(entity);
  }
  
  public addDynamicEntity(entity: Entity): void {
    this._dynamicEntities.push(entity);
  }
  
  public addControlledEntity(entity: Entity): void {
    this._controlledEntities.push(entity);
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
    let solids =  _.concat(this._controlledEntities, this._dynamicEntities, this._staticEntities)
                   .filter(entity => entity.isSolid)
                   .map(entity => entity.displayObject.getBounds());
    return solids;
  }

  public getMaxVelocity(hitbox: PIXI.Rectangle, velocity: PIXI.Point): PIXI.Point {
    let maxVelocity = velocity.clone(),
        solids = this._getSolids();
    if (maxVelocity.x !== 0) maxVelocity.x = this._getMaxAxisVelocity(hitbox, 'x', velocity.x, solids);
    if (maxVelocity.y !== 0) maxVelocity.y = this._getMaxAxisVelocity(hitbox, 'y', velocity.y, solids);
    return maxVelocity;
  }

  private _getMaxAxisVelocity(hitbox: PIXI.Rectangle, axis: 'x' | 'y', v: number, solids: PIXI.Rectangle[]): number {
    let testHitbox = hitbox.clone(),
        hasIntersection = false,
        isDesc = v > 0;
    testHitbox[axis] += v;
    _.each(solids, solid => {
      if (this._testIntersection(testHitbox, solid)) {
        isDesc ? v-- : v++;
        hasIntersection = true;
        return false;
      } return true;
    });
    return (!hasIntersection || v === 0) ? v : this._getMaxAxisVelocity(hitbox, axis, v, solids);
  }
}