import { Entity } from './entity';
import { LoopService } from 'engine/services/loop.service';
import { Player, IPlayerEvent } from 'engine/players/player';

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
    this._updatePosition();
    if (this._isDoingAction) this._action();

  }

  protected _updatePosition(): void {
    this.displayObject.position.x += this._velocity.x;
    this.displayObject.position.y += this._velocity.y;
  }

  protected _action(): void {
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