import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { Body } from 'engine/physics/body';

export function HasBody<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
  
    constructor(...args: any[]) {
      super(...args);
      this._body = new Body();
      this._updateActions.push(() => this._velocity = this.body.velocity);
    }
  
  }

}