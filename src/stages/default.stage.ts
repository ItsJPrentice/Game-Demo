import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { KeyboardInput } from '../inputs/keyboard.input';
import { SpriteService } from '../services/sprite.service';
import { IBoundary } from '../actors/actor';
import { Hero } from '../actors/hero.actor';
import { Player } from '../players/player';

export class DefaultStage extends Stage {

  private _hero: Hero;
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
    this._setupActors();
    this._setupPlayers();
  }

  private _setupBackground(): void {
    this.container.addChild(SpriteService.getSprite('background.png'));
  }

  private _setupActors(): void {
    this._hero = new Hero();
    this._hero.sprite.position.set(8,8);
    this._hero.setBoundary(this._boundary);
    this.container.addChild(this._hero.sprite);
  }
  
  private _setupPlayers(): void {
    this._player = new Player();
    setTimeout(() => this._player.input = new KeyboardInput().stream, 2000);
    this._hero.setPlayer(this._player);
  }

}