import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { Vector } from 'engine/math/vector';

export function HasMovement<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    protected _velocity = new Vector(0,0);
  
    constructor(...args: any[]) {
      super(...args);
      this.updateStream.subscribe(delta => this._updatePosition(delta));
    }
    
    private _updatePosition(delta: number): void {
      let x = this.container.position.x + (this._velocity.x * delta),
          y = this.container.position.y + (this._velocity.y * delta);
      this.container.position.set(x,y);
    }
  
  }

}