import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { World } from 'engine/physics/world';

export function HasPhysicsWorld<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _physicsWorld = new World();
  
    constructor(...args: any[]) {
      super(...args);
      this.updateStream.subscribe(delta => this.physicsWorld.update(delta));
    }

    public get physicsWorld(): World {
      return this._physicsWorld;
    }
  
  }

}