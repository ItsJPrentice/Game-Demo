import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { Vector } from 'engine/math/vector';

export function HasMovement<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    public velocity = new Vector([0,0]);
  
    constructor(...args: any[]) {
      super(...args);
      //this.updateStream.subscribe(delta => this._updatePositionFromVelocity(delta));
    }
    
    private _updatePositionFromVelocity(delta: number): void {
      let x = this.container.position.x + (this.velocity.x * delta),
          y = this.container.position.y + (this.velocity.y * delta);
      this.container.position.set(x,y);
    }
  
  }

}