import * as PIXI from 'pixi.js';
import { Actor } from 'engine/entities/actor.entity';
import { IPlayerEvent } from 'engine/players/player';
import { JumpAction } from 'game/actions/jump.action';

export class Hero extends Actor {

  protected _activeJump: JumpAction;
  protected _jumpVelocity = -25;
  protected _inputVelocityX = 3;

  constructor() {
    super(true);
    this._displayObject = new PIXI.Sprite(PIXI.utils.TextureCache['sprites/token1.png']);
  }
  
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

  protected _action1(): void {
    if (!this._activeJump) this._activeJump = new JumpAction(this._jumpVelocity);
  }
  
  protected _onMoveUp(state: 'start' | 'stop'): void {
    this._isDoingAction1 = state === 'start';
  }  
  protected _onMoveDown(state: 'start' | 'stop'): void { }

}