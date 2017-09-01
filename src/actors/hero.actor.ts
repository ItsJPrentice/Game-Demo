import { Actor } from './actor';
import { SpriteService } from '../services/sprite.service';

export class Hero extends Actor {

  constructor() {
    super('token1.png');
    this.sprite.anchor.x = .5;
    this.sprite.anchor.y = .5;
  }

  protected _action(): void {
    this.sprite.rotation += .1;
  }

}