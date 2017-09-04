import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { Fixture } from 'engine/entities/fixture.entity';
import { Prop } from 'engine/entities/prop.entity';
import { Actor } from 'engine/entities/actor.entity';
import { Collision } from './collision';
import { ContactCache } from './contact.cache';

export class CollisionDetector {

  private _actors: Observable<Actor[]>;
  private _props: Observable<Prop[]>;
  private _fixtures: Observable<Fixture[]>;
  private _contactCache = new ContactCache();

  constructor(actors: Observable<Actor[]>, props?: Observable<Prop[]>, fixtures?: Observable<Fixture[]>) {
    this._actors = actors;
    this._props = props;
    this._fixtures = fixtures;
  }

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

  private _checkEntityCollision(entity1: Entity, entity2: Entity): void {
    if (this._testIntersection(entity1.displayObject.getBounds(), entity2.displayObject.getBounds())) {
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