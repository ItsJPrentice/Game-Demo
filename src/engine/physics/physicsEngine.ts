import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { PhysicsBody } from 'engine/physics/physicsBody';
import { ExternalForces } from 'engine/physics/externalForces';
import { Intersections } from 'engine/math/intersections';

export class PhysicsEngine {

  private _bodies = <PhysicsBody[]>[];

  public externalForces: ExternalForces = {
    gravity: new Vector(0,.1),
    density: 1.2
  }
  
  constructor() {}

  private _bool = false;

  public update(delta: number): void {
    _.each(this._bodies, physicsBody => physicsBody.update(delta, this.externalForces));
    this._detectCollisions();
  }

  public addPhysicsBody(body: PhysicsBody): void {
    this._bodies.push(body);
  }
  
  private _detectCollisions(): void {
    let movingBodies = _.filter(this._bodies, body => !body.isFixed && !!body.hitbox),
        fixedBodies = _.filter(this._bodies, body => body.isFixed && !!body.hitbox);
    _.each(movingBodies, (body, index) => {
      _.each(movingBodies.slice(index), mBody => this._checkBodyCollision(body, mBody));
      _.each(fixedBodies, fBody => this._checkBodyCollision(body, fBody));
    });
  }

  private _checkBodyCollision(body1: PhysicsBody, body2: PhysicsBody): void {
    if (Intersections.testRectangles(body1.hitbox, body2.hitbox)) {
      body1.collide(body2);
      body2.collide(body1);
    }
  }

}