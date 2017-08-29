import { BaseObject } from './object';
import { SpriteService } from '../services/sprite.service';
import { KeyboardService } from '../services/keyboard.service';
import { GameLoopService } from '../services/gameLoop.service';

export class Player extends BaseObject {

  constructor(hasKeyboardControl: boolean = false) {
    super(hasKeyboardControl);
    this.sprite = SpriteService.getSprite('token1.png');
  }

}