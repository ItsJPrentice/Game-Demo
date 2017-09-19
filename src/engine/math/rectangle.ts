import * as _ from 'lodash';
import { Vector } from './vector';

export class Rectangle {

  private _dimensions: Vector;
  private _position: Vector;
  private _velocity: Vector;

  public get dimensions(): Vector { return this._dimensions; }
  public get position(): Vector { return this._position; }
  public get velocity(): Vector { return this._velocity; }

  constructor(dimensions: Vector, position?: Vector, velocity?: Vector) {
    this._dimensions = dimensions;
    this._position = position ? position : new Vector();
    this._velocity = velocity ? velocity : new Vector();
  }

  public addVelocity(velocity: Vector): Rectangle {
    return new Rectangle(
      this._dimensions,
      this._position,
      this._velocity.add(velocity)
    );
  }
  
  public setDimensions(dimensions: Vector): Rectangle {
    return new Rectangle(
      dimensions,
      this._position,
      this._velocity
    );
  }

  public setPosition(position: Vector): Rectangle {
    return new Rectangle(
      this._dimensions,
      position,
      this._velocity
    );
  }
  
  public setVelocity(velocity: Vector): Rectangle {
    return new Rectangle(
      this._dimensions,
      this._position,
      velocity
    );
  }

}