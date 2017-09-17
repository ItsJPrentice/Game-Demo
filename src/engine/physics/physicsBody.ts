import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { ExternalForces } from 'engine/physics/externalForces';
import {} from 'engine/physics/aabb';
import { Collision } from 'engine/physics/collision';

export class PhysicsBody {
  
  public position = new PIXI.Point();  
  public acceleration = new Vector();
  public isFixed = false;

  private _velocity = new Vector();
  private _mass = 1;
  private _drag = 1;
  private _minVelocityX: number | null = 5;
  private _maxVelocityX: number | null = 5;
  
  private _hitbox: PIXI.Rectangle;
  public get hitbox(): PIXI.Rectangle { return this._hitbox; }
  public set hitbox(hitbox: PIXI.Rectangle) {
    hitbox.x = this.position.x;
    hitbox.y = this.position.y;
    this._hitbox = hitbox;
  }
  
  private _collisions = new Subject<Collision>();
  public get collisions(): Observable<Collision> { return this._collisions.asObservable(); }

  constructor(position: PIXI.Point | PIXI.ObservablePoint) {
    this.position = new PIXI.Point();
    this.position.copy(position);
  }

  public update(delta: number, externalForces: ExternalForces): void {
    if (!this.isFixed) {
      this._updateVelocity(delta, externalForces);
      this._updatePosition(delta, externalForces);
    }
  }
  
  private _updateVelocity(delta: number, externalForces: ExternalForces): void {
    let weightVector: Vector = externalForces.gravity.multipyScalar(this._mass);
    this._velocity = this._velocity
                        .add(weightVector)
                        .add(this.acceleration)
                        .multipyScalar(delta);
  }
  
  private _updatePosition(delta: number, externalForces: ExternalForces): void {
    this.position.set(
      this.position.x + (this._velocity.x * delta),
      this.position.y + (this._velocity.y * delta)
    );
    if (this.hitbox) {
      this.hitbox.x = this.position.x;
      this.hitbox.y = this.position.y;
    }
  }

  public collide(body: PhysicsBody): void {
    console.log(this, 'collides with: ', body);
  }

}