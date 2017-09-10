import * as _ from 'lodash';

export class Body {

  private _velocity: [number, number] = [0,0];
  private _acceleration: [number, number] = [0,0];
  private _mass = 5;
  private _friction = 5;

  public get velocity(): [number, number] {
    return _.clone(this._velocity);
  }

  public updateVelocity(delta: number, gravity: number): void {

  }

}