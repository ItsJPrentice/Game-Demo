import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { SpriteService } from '../services/sprite.service';
import { IBoundary } from '../objects/object';
import { Player } from '../objects/player.object';

export class DefaultStage extends Stage {

  private _player: Player;
  private _boundary: IBoundary = {
    x: 8,
    y: 8,
    width: 248,
    height: 248
  }

  constructor() {
    super();
    this.container.addChild(SpriteService.getSprite('background'));
    this._player = new Player(true);
    this.container.addChild(this._player.sprite);
    this._player.sprite.position.set(8,8);
    this._player.setBoundary(this._boundary);
  }

}