import { Actor } from './actor';
import { SpriteService } from '../services/sprite.service';
import { Player } from '../players/player';
import { GameLoopService } from '../services/gameLoop.service';

export class Hero extends Actor {

  constructor() {
    super();
    this.sprite = SpriteService.getSprite('token1.png');
  }

}