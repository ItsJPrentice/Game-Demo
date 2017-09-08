import * as PIXI from 'pixi.js';
import { Actor } from 'engine/entities/actor.entity';
import { MovableActor } from 'engine/entities/mixins/movable.actor';

export class HeroBase extends Actor {

  constructor() {
    super();
    this._displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/token1.png']);
  }
  /*

  protected _activeJump: JumpAction;
  protected _jumpVelocity = -25;
  protected _maxVelocityX = 3;

  protected _updatePosition(deltaTime: number): void {
    let velocity = new PIXI.Point(
      this._inputVelocity.x,
      this._inputVelocity.y + (this._activeJump ? this._activeJump.getNextVelocity(this._gravityVelocity) : this._gravityVelocity)
    );
    if (velocity.y > this._gravityVelocity) velocity.y = this._gravityVelocity;
    this._setPosition(velocity);
  }
  
  protected _setPosition(velocity: PIXI.Point): void {
    let maxVelocity = this._collisionDetector
                          .getMaxVelocity(this.displayObject.getBounds(), velocity);
    this.displayObject.position.x += maxVelocity.x;
    this.displayObject.position.y += maxVelocity.y;
    if (maxVelocity.y === 0) this._activeJump = null;
  }

  protected _tryAction1(isToggled: boolean): void {
    if (isToggled && !this._activeJump) this._activeJump = new JumpAction(this._jumpVelocity);
  }
  
  protected _tryMoveUp(isToggled: boolean): void { }  
  protected _tryMoveDown(isToggled: boolean): void { }  

  */
}

export const Hero = MovableActor(HeroBase);