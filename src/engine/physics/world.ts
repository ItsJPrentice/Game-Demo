import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Body } from 'engine/physics/body';
import { Intersections } from 'engine/math/intersections';

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

  public update(delta: number): void {
    _.each(this._bodies, body => body.update(delta, this.worldForces));
    this._detectCollisions();
  }

  public addbody(body: Body): void {
    this._bodies.push(body);
  }
  
  private _detectCollisions(): void {
    let collidableBodies = _.filter(this._bodies, 'hitbox'),
        movingBodies = _.filter(collidableBodies, body => !body.isFixed),
        fixedBodies = _.filter(collidableBodies, body => body.isFixed);
    _.each(movingBodies, (body, index) => {
      _.each(movingBodies.slice(index), mBody => this._checkBodyCollision(body, mBody));
      _.each(fixedBodies, fBody => this._checkBodyCollision(body, fBody));
    });
  }

  private _checkBodyCollision(body1: Body, body2: Body): void {
    if (Intersections.testRectangles(body1.hitbox, body2.hitbox)) {
      body1.collide(body2);
      body2.collide(body1);
    }
  }

}