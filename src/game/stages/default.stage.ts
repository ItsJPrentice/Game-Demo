import * as PIXI from 'pixi.js';
import { Stage } from 'engine/entities/stages/stage.entity';
import { Player } from 'engine/players/player';
import { Floor } from '../fixtures/floor.fixture';
import { Wall } from '../fixtures/wall.fixture';
import { Explosion } from '../fixtures/explosion.fixture';
import { Treasure } from '../props/treasure.prop';
import { Hero } from '../actors/hero.actor';
import { Monster } from '../actors/monster.actor';
import { KeyboardInputs } from 'engine/inputs/keyboard.inputs';
import { GamepadInputs } from 'engine/inputs/gamepad.inputs';

export class DefaultStage extends Stage {

  private _hero: Hero;

  constructor() {
    super();
    this._setupFixtures();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
  }

  protected _setupFixtures(): void {
    this._addEntity(new Floor(256, 256), new PIXI.Point(0, 0));
    this._addEntity(new Wall(240, 16), new PIXI.Point(0, 0));
    this._addEntity(new Wall(16, 240), new PIXI.Point(240, 0));
    this._addEntity(new Wall(240, 16), new PIXI.Point(16, 240));
    this._addEntity(new Wall(16, 256), new PIXI.Point(0, 16));
    this._addEntity(new Wall(16*3, 16), new PIXI.Point(16*3, 256 - 16*3));
    this._addEntity(new Explosion(), new PIXI.Point(16, 16));
  }

  protected _setupProps(): void {
    this._addEntity(new Treasure(), new PIXI.Point(100, 100));
  }

  protected _setupActors(): void {
    this._hero = new Hero();
    this._addEntity(this._hero, new PIXI.Point(128, 128));
    this._addEntity(new Monster(), new PIXI.Point(150, 150));
  }
  
  protected _setupPlayers(): void {
    let player1 = new Player();
    player1.input = new GamepadInputs().streams[0];
    this._hero.input = player1.stream;
  }

}