import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { KeyboardInput } from '../inputs/keyboard.input';
import { SpriteService } from '../services/sprite.service';
import { Prop } from '../props/prop';
import { Hero } from '../actors/hero.actor';
import { Monster } from '../actors/monster.actor';
import { Player } from '../players/player';

export class DefaultStage extends Stage {

  private _hero: Hero;

  constructor() {
    super(true);
  }

  protected _setupMap(): void {
    this.container.addChild(SpriteService.getSprite('background.png'));
    this._boundary = {
      x: 0,
      y: 0,
      width: 256,
      height: 256
    };
  }

  protected _setupProps(): void {
    this._addProp(new Prop(), new PIXI.Point(100, 100));
  }

  protected _setupActors(): void {
    this._hero = new Hero();
    this._addActor(this._hero, new PIXI.Point(128, 128));
    this._addActor(new Monster(), new PIXI.Point(150, 150));
  }
  
  protected _setupPlayers(): void {
    this._addPlayer(new Player());
    this._players[0].input = new KeyboardInput().stream
    this._hero.setPlayer(this._players[0]);
  }

}