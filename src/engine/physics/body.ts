import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';
import { WorldForces } from 'engine/physics/world';

export class Body {
  
  public hitbox: Rectangle;
  public force = new Vector();
  public mass = 1;
  public isFixed = false;

  constructor(hitbox: Rectangle) {
    this.hitbox = hitbox;
  }

  public setPosition(position: Vector): void {
    this.hitbox = this.hitbox.setPosition(position);
  }
  
  /*
  private _updateHitbox(delta: number, worldForces: WorldForces): void {
    let velocity = this.force
      .add(worldForces.gravity.multipyByScalar(this.mass))
      .multipyByScalar(delta);
  }
  
  private _updatePosition(delta: number): void {
    this._hitbox = this._hitbox.addVelocity(
      this.force
          .add(worldForces.gravity.multipyByScalar(this.mass))
          .multipyByScalar(delta)
    );
  }

  private _collisions = new Subject<any>();
  public get collisions(): Observable<any> { return this._collisions.asObservable(); }
  

  public collide(body: Body): void {
    if (body.type === 'solid') this._onSolidBodyCollision(body);
  }

  private _onSolidBodyCollision(body: Body): void {

  }

  */

}