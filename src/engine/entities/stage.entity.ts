import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Entity } from './entity';
import { Fixture } from './fixture.entity';
import { Prop } from './prop.entity';
import { Actor } from './actor.entity';
import { Player } from 'engine/players/player';
import { LoopService } from 'engine/services/loop.service';
import { CollisionDetector } from 'engine/collisions/collisionDetector';

export class Stage extends Entity {
  
  protected _displayObject: PIXI.Container;

  protected _collisionDetector: CollisionDetector;
  protected _fixtures = <Fixture[]>[];
  protected _props = <Prop[]>[];
  protected _actors = <Actor[]>[];
  protected _players = <Player[]>[];

  constructor() {
    super();
    this._displayObject = new PIXI.Container();
    this._setupCollisionDetection();
    this._setupMap();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
    LoopService.gameLoop.subscribe(() => this._update());
  }
  
  public get displayObject(): PIXI.Container {
    return this._displayObject;
  }
  
  protected _setupMap(): void { }
  protected _setupProps(): void { }
  protected _setupActors(): void { }
  protected _setupPlayers(): void { }

  protected _addEntity(entity: Entity, position?: PIXI.Point): void {
    this.displayObject.addChild(entity.displayObject);
    if (position) entity.displayObject.position = position;
    entity.collisionDetector = this._collisionDetector;
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

  protected _setupCollisionDetection(): void {
    this._collisionDetector = new CollisionDetector();
  }

  protected _update(): void {
  }

}