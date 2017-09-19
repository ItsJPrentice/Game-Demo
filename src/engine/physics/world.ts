import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Body } from 'engine/physics/body';
import { CollisionDetector } from 'engine/collisions/collisionDetector';

export interface WorldForces {
  gravity: Vector,
  density: number
}

export class World {
  
  private _bodies = <Body[]>[];

  public worldForces: WorldForces = {
    gravity: new Vector([0,.1]),
    density: 1.2
  }
  
  constructor() {}

  private _bool = false;

  public addbody(body: Body): void {
    this._bodies.push(body);
  }
  
  public update(delta: number): void {
    this._updateMovingBodies(delta);
  }

  private _updateMovingBodies(delta: number): void {
    _.each(_.filter(this._bodies, body => !body.isFixed),
      body => this._updateMovingBody(body, delta)
    );
  }
  
  private _updateMovingBody(body: Body, delta: number): void {
    body.hitbox = body.hitbox.setVelocity(this._getNextVelocity(body, delta));
    body.hitbox = body.hitbox.setPosition(this._getNextPosition(body));
  }
  
  private _getNextVelocity(body: Body, delta: number): Vector {
    return body.hitbox.velocity
      .add(body.force.multipyByScalar(body.mass))
      .add(this.worldForces.gravity.multipyByScalar(body.mass))
      .multipyByScalar(delta);
  }
  
  private _getNextPosition(body: Body): Vector {
    let collision = this._getFixedCollision(body);
    return body.hitbox.position
      .add(body.hitbox.velocity);
  }
  
  private _getFixedCollision(body: Body): any {
    return _(this._bodies)
      .filter(fBody => fBody.isFixed)
      .find(fBody => CollisionDetector.sweptAABB(body.hitbox, fBody.hitbox));
  }

  private _checkBodyCollision(body1: Body, body2: Body): void {
    CollisionDetector.sweptAABB(body1.hitbox, body2.hitbox);
  }

}