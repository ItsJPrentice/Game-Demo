import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { Body } from 'engine/physics/body';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';

export function HasPhysicsBody<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _physicsBody: Body;
  
    constructor(...args: any[]) {
      super(...args);
      this._physicsBody = new Body(this._getHitbox());
      this.position$.subscribe(position => this._updatePhysicsBodyPosition(position));
      this.update$.subscribe(delta => this._updatePositionFromPhysicsBody());
    }

    public get physicsBody(): Body {
      return this._physicsBody;
    }

    protected _setHitbox(): void {
      this.physicsBody.hitbox = this._getHitbox();
    }

    protected _getHitbox(): Rectangle {
      let bounds = this.container.getBounds();
      return new Rectangle(
        new Vector([bounds.width, bounds.height]),
        new Vector([bounds.x, bounds.y])
      );
    }

    private _updatePhysicsBodyPosition(position: Vector): void {
      if (!this.physicsBody.hitbox.position.isEqual(position)) {
        this.physicsBody.setPosition(position);
      }
    }

    private _updatePositionFromPhysicsBody(): void {
      this.container.position.set(
        this.physicsBody.hitbox.position.x,
        this.physicsBody.hitbox.position.y
      );
    }
  
  }

}