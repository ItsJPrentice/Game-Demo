import { Actor } from './actor';
import { SpriteService } from '../services/sprite.service';

export class Monster extends Actor {

  constructor() {
    super();
    this.sprite = SpriteService.getSprite('token3.png');
  }

}