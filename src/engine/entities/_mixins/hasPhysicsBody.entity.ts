import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { PhysicsBody } from 'engine/physics/physicsBody';
import { AABB } from 'engine/math/aabb';

export function HasPhysicsBody<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _physicsBody = new PhysicsBody();
  
    constructor(...args: any[]) {
      super(...args);
    }

    public get physicsBody(): PhysicsBody {
      return this._physicsBody;
    }

    public setHitbox(hitbox: AABB): void {
      this._physicsBody.setHitbox(hitbox);
    }
  
  }

}