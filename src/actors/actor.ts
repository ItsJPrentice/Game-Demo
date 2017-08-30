import { KeyboardService } from '../services/keyboard.service';
import { GameLoopService } from '../services/gameLoop.service';
import { Player } from '../players/player';

export interface IVelocity {
  x: number,
  y: number
}

export interface IBoundary {
  x: number,
  y: number,
  width: number,
  height: number
}

export class Actor {
  
  public sprite: PIXI.Sprite;
  protected _velocity: IVelocity;
  protected _boundary: IBoundary;

  constructor() {
    this._velocity = { x: 0, y: 0 };
    GameLoopService.loop.subscribe(() => this._update());
  }

  public setPlayer(player: Player): void {
    player.outputStream.subscribe(event => {
      this._onKeyPress(event);
    });
  }
  
  protected _update(): void {
    this.sprite.position.x += this._velocity.x;
    this.sprite.position.y += this._velocity.y;
    this._checkBoundary();
  }

  protected _onKeyPress(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':    this._velocity.y -= (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowRight': this._velocity.x += (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowDown':  this._velocity.y += (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowLeft':  this._velocity.x -= (event.type === 'keydown' ? 1 : -1); break;
      default: break;
    }
  }

  public setBoundary(boundary: IBoundary): void {
    this._boundary = boundary;
  }

  protected _checkBoundary() {
    let collision: string;
    if (!this._boundary) return collision;
    if (this.sprite.x < this._boundary.x) {
      this.sprite.x = this._boundary.x;
      collision = 'left';
    }
    if (this.sprite.y < this._boundary.y) {
      this.sprite.y = this._boundary.y;
      collision = 'top';
    }
    if (this.sprite.x + this.sprite.width > this._boundary.width) {
      this.sprite.x = this._boundary.width - this.sprite.width;
      collision = 'right';
    }
    if (this.sprite.y + this.sprite.height > this._boundary.height) {
      this.sprite.y = this._boundary.height - this.sprite.height;
      collision = 'bottom';
    }
    return collision;
  }

}