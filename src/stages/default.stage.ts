import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { KeyboardInput } from '../inputs/keyboard.input';
import { SpriteService } from '../services/sprite.service';
import { BoundaryEntity } from '../entities/boundary.entity';
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
    this._setBoundary(new BoundaryEntity(new PIXI.Rectangle(0, 0, 256, 256)));
  }

  protected _setupProps(): void {
    this._addProp(new Prop('token2.png'), new PIXI.Point(100, 100));
  }

  protected _setupActors(): void {
    this._hero = new Hero();
    this._addActor(this._hero, new PIXI.Point(128, 128));
    this._addActor(new Monster(), new PIXI.Point(150, 150));
  }
  
  protected _setupPlayers(): void {
    let player1 = new Player();
    player1.input = new KeyboardInput().stream;
    this._hero.setPlayer(player1);
    this._addPlayer(player1);
  }

}