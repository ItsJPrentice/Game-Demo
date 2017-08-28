import { BaseObject } from './object';
import { SpriteService } from '../services/sprite.service';
import { KeyboardService } from '../services/keyboard.service';
import { GameLoopService } from '../services/gameLoop.service';

export class Player extends BaseObject {

  constructor(hasKeyboardControl: boolean = false) {
    super();
    this._velocity = { x: 0, y: 0 };
    this.sprite = SpriteService.getSprite('token1');
    GameLoopService.loop.subscribe(() => this._update());
    if (hasKeyboardControl) KeyboardService.keyPresses.subscribe(event => this._onKeyPress(event));
  }

}