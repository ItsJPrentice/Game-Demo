import { Actor } from './actor';
import { SpriteService } from '../services/sprite.service';

export class Monster extends Actor {

  constructor() {
    super();
    this.displayObject = SpriteService.getSprite('token1.png');
  }

}