import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { PhysicsBody } from 'engine/physics/physicsBody';

export function HasPhysicsBody<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _physicsBody = new PhysicsBody(this.container.position);
  
    constructor(...args: any[]) {
      super(...args);
      this.updateStream.subscribe(delta => this._updatePositionFromPhysicsBody());
    }

    public get physicsBody(): PhysicsBody {
      return this._physicsBody;
    }

    protected _setHitbox(hitbox: PIXI.Rectangle): void {
      this.physicsBody.hitbox = hitbox;
    }
    
    public setPosition(position: PIXI.Point): void {
      this.container.position.copy(position);
      this.physicsBody.position.copy(position);
    }

    private _updatePositionFromPhysicsBody(): void {
      this.container.position.copy(this.physicsBody.position);
    }
  
  }

}