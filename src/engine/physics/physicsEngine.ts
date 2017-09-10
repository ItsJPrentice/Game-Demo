import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Body } from 'engine/physics/body';

export class PhysicsEngine {

  private _bodies: Body[];
  private _gravity: 5;
  
  constructor(bodies: Observable<Body[]>) {
    bodies.subscribe(bodies => this._bodies = bodies);
  }

  public update(delta: number): void {
    _.each(this._bodies, body => body.updateVelocity(delta, this._gravity));
  }

}