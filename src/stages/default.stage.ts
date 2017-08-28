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
    this._setupBackground();
    this._setupPlayer();
  }

  private _setupBackground(): void {
    this.container.addChild(SpriteService.getSprite('background'));
  }

  private _setupPlayer(): void {
    this._player = new Player(true);
    this._player.sprite.position.set(8,8);
    this._player.setBoundary(this._boundary);
    this.container.addChild(this._player.sprite);
  }

}