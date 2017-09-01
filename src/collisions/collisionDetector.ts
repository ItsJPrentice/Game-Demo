import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { BoundaryEntity } from '../entities/boundary.entity';
import { Entity } from '../entities/entity';
import { Collision } from './collision';
import { ContactCache } from './contact.cache';

export class CollisionDetector {

  private _collisions = new Subject<Collision>();
  private _staticEntities = <Entity[]>[];
  private _dynamicEntities = <Entity[]>[];
  private _contactCache = new ContactCache();

  constructor(staticEntities: Observable<Entity[]>, dynamicEntities: Observable<Entity[]>) {
    staticEntities.subscribe(entities => this._staticEntities = entities);
    dynamicEntities.subscribe(entities => this._dynamicEntities = entities);
  }

  public checkCollisions(): void {
    _.each(this._dynamicEntities, this._checkDynamicEntity.bind(this));
  }

  private _checkDynamicEntity(dynamicEntity: Entity, index: number): void {
    _.each(this._staticEntities,
           staticEntity => this._checkEntityCollision(dynamicEntity, staticEntity));
    _.each(_.slice(this._dynamicEntities, index + 1),
           dynamicEntity2 => this._checkEntityCollision(dynamicEntity, dynamicEntity2));
  }

  private _checkEntityCollision(entity1: Entity, entity2: Entity): void {
    if (this._testIntersection(entity1.sprite.getBounds(), entity2.sprite.getBounds())) {
      this._onEntityCollision(entity1, entity2);
    } else {
      this._tryClearCollision(entity1, entity2);
    }
  }

  private _testIntersection(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return !(
             (r2.x > (r1.x + r1.width))  ||
             ((r2.x + r2.width) < r1.x)  ||
             (r2.y > (r1.y + r1.height)) ||
             ((r2.y + r2.height) < r1.y)
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
}