import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Actor } from 'engine/entities/actor.entity';
import { Prop } from 'engine/entities/prop.entity';

export function MovableActor<T extends Constructor<Actor>>(Base: T) {

  return class extends Base {
  
    constructor(...args: any[]) {
      super(...args);
    }
    
    /*
    protected _inputAccelerationX = 1;
    protected _inputAccelerationY = 1;
    protected _inputAcceleration = new PIXI.Point(0,0);
    protected _maxVelocityX = 1;
    protected _maxVelocityY = 1;
    protected _velocity = new PIXI.Point(0,0);
    protected _gravityVelocity = 0;
    protected _isDoingAction1: boolean;
    protected _isDoingAction2: boolean;
  
    constructor(useGravity?: boolean) {
      super();
      if (useGravity) this._gravityVelocity = CONSTANTS.GRAVITY;
    }
  
    public setPlayer(player: Player): void {
      player.stream.subscribe(event => this._onPlayerInput(event));
    }
    
    public update(deltaTime: number): void {
      if (this._isDoingAction1) this._action1();
      if (this._isDoingAction2) this._action2();
      this._updatePosition(deltaTime);
    }
  
    protected _updatePosition(deltaTime: number): void {
      let velocity = new PIXI.Point(
        this._velocity.x,
        this._velocity.y + this._gravityVelocity
      );
      this._setPosition(velocity);
    }
  
    protected _setPosition(velocity: PIXI.Point): void {
      let maxVelocity = this._clampVelocity(velocity);
      this.displayObject.position.x += maxVelocity.x;
      this.displayObject.position.y += maxVelocity.y;
    }
  
    protected _clampVelocity(velocity: PIXI.Point): PIXI.Point {
      if (velocity.x > 0 && velocity.x > this._maxVelocityX) velocity.set(this._maxVelocityX, velocity.y);
      if (velocity.x < 0 && velocity.x < this._maxVelocityX * -1) velocity.set(this._maxVelocityX * -1, velocity.y);
      if (velocity.y > 0 && velocity.y > this._maxVelocityY) velocity.set(velocity.x, this._maxVelocityY);
      if (velocity.y < 0 && velocity.y < this._maxVelocityY * -1) velocity.set(velocity.x, this._maxVelocityY * -1);
      return this._collisionDetector
      .getMaxVelocity(this.displayObject.getBounds(), velocity)
    }
    
    public set collisionDetector(collisionDetector: CollisionDetector) {
      this._collisionDetector = collisionDetector;
      this._collisionDetector.addControlledEntity(this);
    }
    
    protected _action1(): void {
      console.log('Action 1');
    }
    
    protected _action2(): void {
      console.log('Action 2');
    }
  
    protected _onPlayerInput(input: GameInput): void {
      this._moveX(input.movements.x);
      this._moveY(input.movements.y);
      this._tryAction1(input.actions.action1);
      this._tryAction2(input.actions.action1);
    }
    
    protected _moveX(movement: number): void {
      this._velocity.set(this._velocity.x, this._velocity.y + this._inputAccelerationY * movement);
    }
    
    protected _moveY(movement: number): void {
      this._velocity.set(this._velocity.x + this._inputAccelerationX * movement, this._velocity.y);
    }
    
    protected _tryMoveDown(isToggled: boolean): void {
      if (isToggled) this._velocity.set(this._velocity.x, this._velocity.y + this._inputAccelerationY);
    }
    
    protected _tryMoveLeft(isToggled: boolean): void {
      if (isToggled) this._velocity.set(this._velocity.x - this._inputAccelerationX, this._velocity.y);
    }
    
    protected _tryAction1(isToggled: boolean): void {
      this._isDoingAction1 = isToggled;
    }
    
    protected _tryAction2(isToggled: boolean): void {
      this._isDoingAction2 = isToggled;
    }
  
    */

  }

}