import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { KeyboardInput } from '../inputs/keyboard.input';
import { SpriteService } from '../services/sprite.service';
import { Hero } from '../actors/hero.actor';
import { Player } from '../players/player';

export class DefaultStage extends Stage {

  private _hero: Hero;
  private _player: Player;

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
    this.container.addChild(this._hero.sprite);
  }
  
  private _setupPlayers(): void {
    this._player = new Player();
    setTimeout(() => this._player.input = new KeyboardInput().stream, 2000);
    this._hero.setPlayer(this._player);
  }

}