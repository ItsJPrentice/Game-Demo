import { Entity } from './entity';
import { Player, IPlayerEvent } from 'engine/players/player';
import { Collision } from 'engine/collisions/collision';
import { CollisionDetector } from 'engine/collisions/collisionDetector';
import { CONSTANTS } from 'game/constants';

export class Actor extends Entity {
  
  protected _inputVelocityX = 1;
  protected _inputVelocityY = 1;
  protected _inputVelocity: PIXI.Point;
  protected _gravityVelocity = 0;
  protected _isDoingAction1: boolean;
  protected _isDoingAction2: boolean;

  constructor(useGravity?: boolean) {
    super();
    this._inputVelocity = new PIXI.Point(0, 0);
    if (useGravity) this._gravityVelocity = CONSTANTS.GRAVITY;
  }

  public setPlayer(player: Player): void {
    player.stream.subscribe(event => this._onPlayerEvent(event));
  }
  
  public update(deltaTime: number): void {
    if (this._isDoingAction1) this._action1();
    if (this._isDoingAction2) this._action2();
    this._updatePosition(deltaTime);
  }

  protected _updatePosition(deltaTime: number): void {
    let velocity = new PIXI.Point(
      this._inputVelocity.x,
      this._inputVelocity.y + this._gravityVelocity
    );
    this._setPosition(velocity);
  }

  protected _setPosition(velocity: PIXI.Point): void {
    let maxVelocity = this._collisionDetector
                          .getMaxVelocity(this.displayObject.getBounds(), velocity);
    this.displayObject.position.x += maxVelocity.x;
    this.displayObject.position.y += maxVelocity.y;
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

  protected _onPlayerEvent(event: IPlayerEvent): void {
    switch (event.name) {
      case 'moveUp':    this._onMoveUp(event.type); break;
      case 'moveRight': this._onMoveRight(event.type); break;
      case 'moveDown':  this._onMoveDown(event.type); break;
      case 'moveLeft':  this._onMoveLeft(event.type); break;
      case 'action1':   this._onAction1(event.type); break;
      case 'action2':   this._onAction2(event.type); break;
      default: break;
    }
  }
  
  protected _onMoveUp(state: 'start' | 'stop'): void {
    this._inputVelocity.set(
      this._inputVelocity.x,
      this._inputVelocity.y - (state === 'start' ? this._inputVelocityY : -1 * this._inputVelocityY)
    );
  }
  
  protected _onMoveRight(state: 'start' | 'stop'): void {
    this._inputVelocity.set(
      this._inputVelocity.x + (state === 'start' ? this._inputVelocityX : -1 * this._inputVelocityX),
      this._inputVelocity.y
    );
  }
  
  protected _onMoveDown(state: 'start' | 'stop'): void {
    this._inputVelocity.set(
      this._inputVelocity.x,
      this._inputVelocity.y + (state === 'start' ? this._inputVelocityY : -1 * this._inputVelocityY)
    );
  }
  
  protected _onMoveLeft(state: 'start' | 'stop'): void {
    this._inputVelocity.set(
      this._inputVelocity.x - (state === 'start' ? this._inputVelocityX : -1 * this._inputVelocityX),
      this._inputVelocity.y
    );
  }
  
  protected _onAction1(state: 'start' | 'stop'): void {
    this._isDoingAction1 = state === 'start';
  }
  
  protected _onAction2(state: 'start' | 'stop'): void {
    this._isDoingAction2 = state === 'start';
  }

}