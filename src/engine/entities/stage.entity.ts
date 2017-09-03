import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Entity } from '../entities/entity';
import { Fixture } from '../entities/fixture.entity';
import { Prop } from '../entities/prop.entity';
import { Actor } from '../entities/actor.entity';
import { Player } from '../players/player';
import { LoopService } from '../services/loop.service';
import { CollisionDetector } from '../collisions/collisionDetector';

export class Stage extends Entity {
  
  protected _displayObject: PIXI.Container;

  protected _fixtures = new BehaviorSubject(<Fixture[]>[]);
  protected _props = new BehaviorSubject(<Prop[]>[]);
  protected _actors = new BehaviorSubject(<Actor[]>[]);
  protected _players = new BehaviorSubject(<Player[]>[]);
  protected _collisionDetector: CollisionDetector;

  constructor(detectCollisions: boolean) {
    super();
    this.displayObject = new PIXI.Container();
    this._setupMap();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
    if (detectCollisions) this._setupCollisionDetection();
    LoopService.gameLoop.subscribe(() => this._update());
  }
  
  public get displayObject(): PIXI.Container {
    return this._displayObject;
  }

  public set displayObject(displayObject: PIXI.Container) {
    this._displayObject = displayObject;
  }
  
  protected _setupMap(): void { }
  protected _setupProps(): void { }
  protected _setupActors(): void { }
  protected _setupPlayers(): void { }
  
  protected _addFixture(fixture: Fixture, position?: PIXI.Point): void {
    this._fixtures.next(_.concat(this._fixtures.value, fixture));
    this.displayObject.addChild(fixture.displayObject);
    if (position) fixture.displayObject.position = position;
  }
  
  protected _addProp(prop: Prop, position?: PIXI.Point): void {
    this._props.next(_.concat(this._props.value, prop));
    this.displayObject.addChild(prop.displayObject);
    if (position) prop.displayObject.position = position;
  }
  
  protected _addActor(actor: Actor, position?: PIXI.Point): void {
    this._actors.next(_.concat(this._actors.value, actor));
    this.displayObject.addChild(actor.displayObject);
    if (position) actor.displayObject.position = position;
  }

  protected _addPlayer(player: Player): void {
    this._players.next(_.concat(this._players.value, player));
  }

  protected _setupCollisionDetection(): void {
    this._collisionDetector = new CollisionDetector(this._props.asObservable(),
                                                    this._actors.asObservable());
  }
  
  protected _update(): void {
    if (this._collisionDetector) this._collisionDetector.checkCollisions();
  }

}