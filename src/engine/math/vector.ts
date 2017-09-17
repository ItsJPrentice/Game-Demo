import * as _ from 'lodash';

export class Vector {

  private _vector: [number, number];

  public get x(): number { return this._vector[0]; }
  public get y(): number { return this._vector[1]; }
  public get magnitude(): number { return this.x * this.x + this.y * this.y; }
  public get normal(): number { return Math.sqrt(this.magnitude); }

  constructor(vector: [number, number] = [0,0]) {
    this._vector = vector;
  }
  
  public add(vector: Vector): Vector {
    return new Vector([
      this.x + vector.x,
      this.y + vector.y
    ]);
  }
  
  public subtract(vector: Vector): Vector {
    return new Vector([
      this.x - vector.x,
      this.y - vector.y
    ]);
  }
  
  public multipyScalar(n: number): Vector {
    return new Vector([
      this.x * n,
      this.y * n
    ]);
  }
  
  public divideScalar(n: number): Vector {
    return new Vector([
      this.x === 0 ? 0 : this.x / n,
      this.x === 0 ? 0 : this.y / n
    ]);
  }

}