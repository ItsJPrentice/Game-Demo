import * as _ from 'lodash';

export class Vector {

  public x = 0;
  public y = 0;

  constructor(x?: number, y?: number) {
    if (x) this.x = x;
    if (x && !y) this.y = x;
    if (y) this.y = y;
  }

  public sum(vector: Vector): Vector {
    return new Vector(this.x + vector.x, this.y + vector.y);
  }

  public multipyBy(n: number): Vector {
    return new Vector(this.x * n, this.y * n);
  }

}