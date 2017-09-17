import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { WorldForces } from 'engine/physics/world';
import { Collision } from 'engine/physics/collision';

export class Body {
  
  public position = new PIXI.Point();  
  public acceleration = new Vector();
  public isFixed = false;
  public type: 'solid' | 'oneway' | 'empty' = 'empty';

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

  public update(delta: number, worldForces: WorldForces): void {
    if (!this.isFixed) {
      this._updateVelocity(delta, worldForces);
      this._updatePosition(delta, worldForces);
    }
  }
  
  private _updateVelocity(delta: number, worldForces: WorldForces): void {
    let weightVector: Vector = worldForces.gravity.multipyByScalar(this._mass);
    this._velocity = this._velocity
                        .add(weightVector)
                        .add(this.acceleration)
                        .multipyByScalar(delta);
  }
  
  private _updatePosition(delta: number, worldForces: WorldForces): void {
    this.position.set(
      this.position.x + Math.round(this._velocity.x * delta), //Math.round to snap to pixels
      this.position.y + Math.round(this._velocity.y * delta)
    );
    if (this.hitbox) {
      this.hitbox.x = this.position.x;
      this.hitbox.y = this.position.y;
    }
  }

  public collide(body: Body): void {
    console.log(this, 'collides with: ', body);
  }

}