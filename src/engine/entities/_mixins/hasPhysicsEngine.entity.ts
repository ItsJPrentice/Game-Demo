import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { PhysicsEngine } from 'engine/physics/physicsEngine';

export function HasPhysicsEngine<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _physicsEngine = new PhysicsEngine();
  
    constructor(...args: any[]) {
      super(...args);
      this.updateStream.subscribe(delta => this.physicsEngine.update(delta));
    }

    public get physicsEngine(): PhysicsEngine {
      return this._physicsEngine;
    }
  
  }

}