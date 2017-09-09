import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';
import { Prop } from 'engine/entities/props/prop.entity';
import { Actor } from 'engine/entities/actors/actor.entity';
import { Player } from 'engine/players/player';
import { PhysicsEngine } from 'engine/physicsEngine/physicsEngine';

export class Stage extends Entity {

  protected _physicsEngine = new PhysicsEngine();
  protected _fixtures = <Fixture[]>[];
  protected _props = <Prop[]>[];
  protected _actors = <Actor[]>[];
  protected _players = <Player[]>[];

  constructor() {
    super();
    this._setupFixtures();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
  }
  
  protected _setupFixtures(): void { }
  protected _setupProps(): void { }
  protected _setupActors(): void { }
  protected _setupPlayers(): void { }

  protected _addEntity(entity: Entity, position?: PIXI.Point): void {
    this.container.addChild(entity.container);
    if (position) entity.container.position = position;
  }
  
  protected _addFixture(fixture: Fixture, position?: PIXI.Point): void {
    this._fixtures.push(fixture);
    this._addEntity(fixture, position);
  }
  
  protected _addProp(prop: Prop, position?: PIXI.Point): void {
    this._props.push(prop);
    this._addEntity(prop, position);
  }
  
  protected _addActor(actor: Actor, position?: PIXI.Point): void {
    this._actors.push(actor);
    this._addEntity(actor, position);
  }

  protected _addPlayer(player: Player): void {
    this._players.push(player);
  }

  public update(deltaTime: number): void {
    _.each(_.concat(this._fixtures, this._props, this._actors), entity => entity.update(deltaTime));
  }

}