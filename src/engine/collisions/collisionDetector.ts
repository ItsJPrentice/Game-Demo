import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';

export class CollisionDetector {
  
  private constructor() { }

  public static sweptAABB(r1: Rectangle, r2: Rectangle): any {
    let broadphaseBox = this.getBroadphaseBox(r1);
    if (CollisionDetector.AABB(broadphaseBox, r2)) {
      console.log('It\'s colliding yo');
    }
  }

  public static getBroadphaseBox(r: Rectangle): Rectangle {
    return new Rectangle(
      new Vector([
        r.velocity.x > 0 ? r.dimensions.x + r.velocity.x : r.dimensions.x - r.velocity.x,
        r.velocity.y > 0 ? r.dimensions.y + r.velocity.y : r.dimensions.y - r.velocity.y,
      ]),
      new Vector([
        r.velocity.x > 0 ? r.position.x : r.position.x + r.velocity.x,
        r.velocity.y > 0 ? r.position.y : r.position.y + r.velocity.y,
      ])
    );
  }
  
  public static AABB(r1: Rectangle, r2: Rectangle): boolean {
    return (
      r1.position.x < r2.position.x + r2.dimensions.x &&
      r1.position.x + r1.dimensions.x > r2.position.x &&
      r1.position.y < r2.position.y + r2.dimensions.y &&
      r1.dimensions.y + r1.position.y > r2.position.y
    );
  }

  /*

  public static testBroadphaseCollision(r1: PIXI.Rectangle, v1: Vector, r2: PIXI.Rectangle): boolean {
    let broadphaseBox = this.getBroadphaseBox(r1);
  }

  public static getBroadphaseBox(r: PIXI.Rectangle, v: Vector): PIXI.Rectangle {
    return new PIXI.Rectangle(
      r
    );
  }

  public static getSweptAABB(r1: PIXI.Rectangle, r2: PIXI.Rectangle): any {
  }

  */

}