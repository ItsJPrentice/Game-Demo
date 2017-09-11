import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { AABB } from 'engine/math/aabb';
import { ExternalForces } from 'engine/physics/externalForces';
import {} from 'engine/physics/aabb';
import { Collision } from 'engine/physics/collision';

export class PhysicsBody {

  private _collisions = new Subject<Collision>();
  public get collisions(): Observable<Collision> { return this._collisions.asObservable(); }
  
  public hitbox: AABB;
  public velocity = new Vector(0,0);
  public acceleration: Vector = new Vector(0,0);
  public mass = 1;
  public drag = 1;
  public minVelocityX: number | null = 5;
  public maxVelocityX: number | null = 5;

  constructor(hitbox?: AABB) {
    if (hitbox) this.setHitbox(hitbox);
  }

  public updateVelocity(delta: number, externalForces: ExternalForces): void {
    let weightVector: Vector = externalForces.gravity.multipyBy(this.mass);
    this.velocity = this.velocity
                        .sum(weightVector)
                        .sum(this.acceleration)
                        .multipyBy(delta);
  }

  public collide(collision: Collision): void {
    this._collisions.next(collision);
  }

  public setHitbox(hitbox: AABB): void {
    this.hitbox = hitbox;
  }

}