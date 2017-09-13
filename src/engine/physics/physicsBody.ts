import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { ExternalForces } from 'engine/physics/externalForces';
import {} from 'engine/physics/aabb';
import { Collision } from 'engine/physics/collision';

export class PhysicsBody {
  
  public position = new PIXI.Point();  
  public acceleration: Vector = new Vector(0,0);
  public hitbox: PIXI.Rectangle;

  private _velocity = new Vector(0,0);
  private _mass = 1;
  private _drag = 1;
  private _minVelocityX: number | null = 5;
  private _maxVelocityX: number | null = 5;
  
  private _collisions = new Subject<Collision>();
  public get collisions(): Observable<Collision> { return this._collisions.asObservable(); }

  constructor(position: PIXI.Point | PIXI.ObservablePoint) {
    this.position = new PIXI.Point();
    this.position.copy(position);
  }

  public update(delta: number, externalForces: ExternalForces): void {
    let weightVector: Vector = externalForces.gravity.multipyBy(this._mass);
    this._velocity = this._velocity
                        .sum(weightVector)
                        .sum(this.acceleration)
                        .multipyBy(delta);
    this.position.set(
      this.position.x + (this._velocity.x * delta),
      this.position.y + (this._velocity.y * delta)
    );
  }

  public collide(collision: Collision): void {
    this._collisions.next(collision);
  }

}