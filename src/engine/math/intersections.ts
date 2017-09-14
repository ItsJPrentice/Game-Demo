import * as PIXI from 'pixi.js';

export class Intersections {

  private constructor() { }

  public static testRectangles(r1: PIXI.Rectangle, r2: PIXI.Rectangle): boolean {
    return (
      r1.x < r2.x + r2.width &&
      r1.x + r1.width > r2.x &&
      r1.y < r2.y + r2.height &&
      r1.height + r1.y > r2.y
    );
  }
}