import { GameLoopService } from '../services/gameLoop.service';
import { Player, IPlayerEvent } from '../players/player';

export interface IVelocity {
  x: number,
  y: number
}

export class Actor {
  
  public sprite: PIXI.Sprite;
  protected _velocity: IVelocity;
  protected _isDoingAction: boolean;

  constructor() {
    this._velocity = { x: 0, y: 0 };
    GameLoopService.loop.subscribe(() => this._update());
  }

  public setPlayer(player: Player): void {
    player.stream.subscribe(event => this._onPlayerEvent(event));
  }
  
  protected _update(): void {
    this._updatePosition();
    if (this._isDoingAction) this._action();

  }

  protected _updatePosition(): void {
    this.sprite.position.x += this._velocity.x;
    this.sprite.position.y += this._velocity.y;
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