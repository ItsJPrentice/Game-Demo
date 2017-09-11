import { Vector } from 'engine/math/vector';

export class AABB {

  public center: Vector;
  public halfSize: Vector;

  constructor(center: Vector, halfSize: Vector) {
    this.center = center;
    this.halfSize = halfSize;
  }

}