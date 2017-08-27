import { SpriteService } from '../services/sprite.service';
import { KeyboardService } from '../services/keyboard.service';
import { GameLoopService } from '../services/gameLoop.service';

export class Player {

  public sprite: PIXI.Sprite;
  private _velocity = { x: 0, y: 0 };

  constructor() {
      this.sprite = SpriteService.getSprite('token1');
      KeyboardService.keyPresses.subscribe(event => this._onKeyPress(event));
      GameLoopService.loop.subscribe(() => this._update());
  }
  
  private _update(): void {
    this.sprite.position.x += this._velocity.x;
    this.sprite.position.y += this._velocity.y;
  }

  private _onKeyPress(event: KeyboardEvent): void {
    switch (event.code) {
      case 'ArrowUp':    this._velocity.y -= (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowRight': this._velocity.x += (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowDown':  this._velocity.y += (event.type === 'keydown' ? 1 : -1); break;
      case 'ArrowLeft':  this._velocity.x -= (event.type === 'keydown' ? 1 : -1); break;
      default: break;
    }
  }
}