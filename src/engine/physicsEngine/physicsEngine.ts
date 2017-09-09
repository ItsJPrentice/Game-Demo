import * as _ from 'lodash';

export interface PhysicsConfig {
  gravity: number
}

export class PhysicsEngine {

  private _config: PhysicsConfig = {
    gravity: 5
  }
  
  constructor(config?: PhysicsConfig) {
    if (config) this._config = _.assign(this._config, config);
  }

}