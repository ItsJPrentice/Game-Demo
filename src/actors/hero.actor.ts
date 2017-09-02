import { Actor } from './actor';
import { SpriteService } from '../services/sprite.service';

export class Hero extends Actor {

  constructor() {
    super();
    this.displayObject = SpriteService.getSprite('token1.png');
  }

  protected _action(): void {
    this.displayObject.rotation += .1;
  }

}