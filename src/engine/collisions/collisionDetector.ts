import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';

export interface SweptCollision {
  normal: Vector,
  entryTime: number
}

export class CollisionDetector {
  
  private constructor() { }

  public static trySweptAABB(r1: Rectangle, r2: Rectangle): SweptCollision {
    let broadphaseBox = this.getBroadphaseBox(r1);
    if (CollisionDetector.AABB(broadphaseBox, r2)) {
      return this.sweptAABB(r1, r2);
    }
    return null;
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

  public static sweptAABB(r1: Rectangle, r2: Rectangle): SweptCollision {
    let invEntry: Vector = this.getInvEntry(r1, r2),
        invExit: Vector = this.getInvExit(r1, r2),
        entry: Vector = this.invertVectorByVelocity(invEntry, r1.velocity),
        exit: Vector = this.invertVectorByVelocity(invExit, r1.velocity),
        entryTime: number = Math.max(entry.x, entry.y),
        exitTime: number = Math.max(exit.x, exit.y);
    if (!(entryTime > exitTime || entry.x < 0 && entry.y < 0 || entry.x > 1 || entry.y > 1)) {
      return {
        normal: this.getSweptCollisionNormal(entry, invEntry, exit, invExit),
        entryTime: entryTime
      }
    }
    return null;
  }

  public static getSweptCollisionNormal(entry: Vector, invEntry: Vector, exit: Vector, invExit: Vector): Vector {
    if (entry.x > entry.y) {
      return new Vector([invEntry.x < 0 ? 1 : -1, 0]);
    } else {
      return new Vector([0, invEntry.y < 0 ? 1 : -1]);
    }
  }
  
  public static getInvEntry(r1: Rectangle, r2: Rectangle): Vector {
    return new Vector([
      r1.velocity.x > 0 ?
        r2.position.x - (r1.position.x + r1.dimensions.x) :
        (r2.position.x + r2.dimensions.x) - r1.position.x,
      r1.velocity.y > 0 ?
        r2.position.y - (r1.position.y + r1.dimensions.y) :
        (r2.position.y + r2.dimensions.y) - r1.position.y
    ]);
  }
  
  public static getInvExit(r1: Rectangle, r2: Rectangle): Vector {
    return new Vector([
      r1.velocity.x > 0 ?
        (r2.position.x + r2.dimensions.x) - r1.position.x :
        r2.position.x - (r1.position.x + r1.dimensions.x),
      r1.velocity.y > 0 ?
        (r2.position.y + r2.dimensions.y) - r1.position.y :
        r2.position.y - (r1.position.y + r1.dimensions.y)
    ]);
  }

  public static invertVectorByVelocity(vector: Vector, velocity: Vector): Vector {
    return new Vector([
      velocity.x === 0 ? 0 : vector.x / velocity.x,
      velocity.y === 0 ? 0 : vector.y / velocity.y
    ]);
  }

}