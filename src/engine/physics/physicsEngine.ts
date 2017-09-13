import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { PhysicsBody } from 'engine/physics/physicsBody';
import { ExternalForces } from 'engine/physics/externalForces';

export class PhysicsEngine {

  private _bodies = <PhysicsBody[]>[];

  public externalForces: ExternalForces = {
    gravity: new Vector(0,.1),
    density: 1.2
  }
  
  constructor() {}

  public update(delta: number): void {
    _.each(this._bodies, physicsBody => physicsBody.update(delta, this.externalForces));
  }

  public addPhysicsBody(body: PhysicsBody): void {
    this._bodies.push(body);
  }
  
  private _detectCollisions(): void {
    
  }

}