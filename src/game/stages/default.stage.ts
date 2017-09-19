import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Vector } from 'engine/math/vector';
import { Stage } from 'engine/entities/stages/stage.entity';
import { HasPhysicsWorld } from 'engine/entities/_mixins/hasPhysicsWorld.entity';
import { Player } from 'engine/players/player';
import { Floor } from '../fixtures/floor.fixture';
import { Wall } from '../fixtures/wall.fixture';
import { Explosion } from '../fixtures/explosion.fixture';
import { Treasure } from '../props/treasure.prop';
import { Hero } from '../actors/hero.actor';
import { Monster } from '../actors/monster.actor';
import { KeyboardInputs } from 'engine/inputs/keyboard.inputs';
import { GamepadInputs } from 'engine/inputs/gamepad.inputs';

export class DefaultStage extends HasPhysicsWorld(Stage) {

  private _hero: Hero;

  constructor() {
    super();
    this._setupFixtures();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
  }

  protected _setupFixtures(): void {
    this._addEntity(new Floor(256, 256), new Vector([0, 0]));
    this._addEntity(new Explosion(), new Vector([16, 16]));
    this._addWalls();
  }

  protected _addWalls(): void {
    let walls = [
      { entity: new Wall(new Vector([240, 16])), position: new Vector([0, 0]) },
      { entity: new Wall(new Vector([16, 240])), position: new Vector([240, 0]) },
      { entity: new Wall(new Vector([240, 16])), position: new Vector([16, 240]) },
      { entity: new Wall(new Vector([16, 256])), position: new Vector([0, 16]) },
      { entity: new Wall(new Vector([16*3, 16])), position: new Vector([16*3, 256 - 16*3]) }
    ];
    _.each(walls, wall => {
      this._addEntity(wall.entity, wall.position);
      this.physicsWorld.addbody(wall.entity.physicsBody);
    });
  }

  protected _setupProps(): void {
    this._addEntity(new Treasure(), new Vector([100, 100]));
  }

  protected _setupActors(): void {
    this._hero = new Hero();
    this._addEntity(this._hero, new Vector([128, 128]));
    this.physicsWorld.addbody(this._hero.physicsBody);
    this._addEntity(new Monster(), new Vector([150, 150]));
  }
  
  protected _setupPlayers(): void {
    let player1 = new Player();
    player1.input = new GamepadInputs().streams[0];
    this._hero.inputSource = player1.stream;
  }

}