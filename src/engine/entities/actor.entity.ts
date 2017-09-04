import { Entity } from './entity';
import { LoopService } from 'engine/services/loop.service';
import { Player, IPlayerEvent } from 'engine/players/player';
import { Collision } from 'engine/collisions/collision';
import { CollisionDetector } from 'engine/collisions/collisionDetector';

export interface IVelocity {
  x: number,
  y: number
}

export class Actor extends Entity {
  
  protected _velocity: IVelocity;
  protected _isDoingAction: boolean;

  constructor() {
    super();
    this._velocity = { x: 0, y: 0 };
    LoopService.gameLoop.subscribe(() => this._update());
  }

  public setPlayer(player: Player): void {
    player.stream.subscribe(event => this._onPlayerEvent(event));
  }
  
  protected _update(): void {
    this._updatePosition(this._collisionDetector
                             .getMaxVelocity(this.displayObject.getBounds(), this._velocity));
    if (this._isDoingAction) this._action();
  }

  protected _updatePosition(velocity: IVelocity): void {
    this.displayObject.position.x += velocity.x;
    this.displayObject.position.y += velocity.y;
  }
  
  public set collisionDetector(collisionDetector: CollisionDetector) {
    this._collisionDetector = collisionDetector;
    this._collisionDetector.addControlledEntity(this);
  }

  protected _action(): void {
    console.log('PUSH BUTAN');
  }

  protected _onPlayerEvent(event: IPlayerEvent): void {
    switch (event.name) {
      case 'moveUp':    this._velocity.y -= (event.type === 'start' ? 1 : -1); break;
      case 'moveRight': this._velocity.x += (event.type === 'start' ? 1 : -1); break;
      case 'moveDown':  this._velocity.y += (event.type === 'start' ? 1 : -1); break;
      case 'moveLeft':  this._velocity.x -= (event.type === 'start' ? 1 : -1); break;
      case 'action':    this._isDoingAction = event.type === 'start'; break;
      default: break;
    }
  }

}