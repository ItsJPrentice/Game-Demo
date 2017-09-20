import { Subject, Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';
import { WorldForces } from 'engine/physics/world';
import { SweptCollision } from 'engine/collisions/collisionDetector.ts';

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

  public collide(collision: SweptCollision, rFrame: number): void {
    this._slideCollisionResponse(collision, rFrame);
  }
  
  private _slideCollisionResponse(collision: SweptCollision, rFrame: number): void {
    let dotprod = (this.hitbox.velocity.x * collision.normal.y +
                  this.hitbox.velocity.y * collision.normal.x) * rFrame;
    this.hitbox = this.hitbox.setVelocity(new Vector([
      dotprod * collision.normal.y,
      dotprod * collision.normal.x
    ]));
  }
  
  private _pushCollisionResponse(collision: SweptCollision, rFrame: number): void {
    let magnitude = this.hitbox.velocity.magnitude * rFrame,
        dotprod = this.hitbox.velocity.x * collision.normal.y +
                  this.hitbox.velocity.y * collision.normal.x;
    if (dotprod !== 0) dotprod = dotprod > 0 ? 1 : -1;
    this.hitbox = this.hitbox.setVelocity(new Vector([
      dotprod * collision.normal.y * magnitude,
      dotprod * collision.normal.x * magnitude
    ]));
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