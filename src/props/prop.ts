import { SpriteService } from '../services/sprite.service';

export class Prop {
  
  public sprite: PIXI.Sprite;

  constructor() {
    this.sprite = SpriteService.getSprite('token2.png');
  }

}