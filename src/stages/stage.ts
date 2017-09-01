import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { SpriteService } from '../services/sprite.service';
import { BoundaryEntity } from '../entities/boundary.entity';
import { Prop } from '../props/prop';
import { Actor } from '../actors/actor';
import { Player } from '../players/player';
import { KeyboardInput } from '../inputs/keyboard.input';
import { LoopService } from '../services/loop.service';
import { CollisionDetector } from '../collisions/collisionDetector';

export class Stage {

  protected _container = new PIXI.Container();
  protected _boundary = new BehaviorSubject<BoundaryEntity>(null);
  protected _props = new BehaviorSubject(<Prop[]>[]);
  protected _actors = new BehaviorSubject(<Actor[]>[]);
  protected _players = new BehaviorSubject(<Player[]>[]);
  protected _collisionDetector: CollisionDetector;

  constructor(detectCollisions: boolean) {
    this._container = new PIXI.Container();
    this._setupMap();
    this._setupProps();
    this._setupActors();
    this._setupPlayers();
    if (detectCollisions) this._setupCollisionDetection();
    LoopService.gameLoop.subscribe(() => this._update());
  }

  public get container(): PIXI.Container {
    return this._container;
  }
  
  protected _setupMap(): void { }
  protected _setupProps(): void { }
  protected _setupActors(): void { }
  protected _setupPlayers(): void { }
  
  protected _setBoundary(boundary: BoundaryEntity): void {
    this._boundary.next(boundary);
  }
  
  protected _addProp(prop: Prop, position?: PIXI.Point): void {
    this._props.next(_.concat(this._props.value, prop));
    this.container.addChild(prop.sprite);
    if (position) prop.sprite.position = position;
  }
  
  protected _addActor(actor: Actor, position?: PIXI.Point): void {
    this._actors.next(_.concat(this._actors.value, actor));
    this.container.addChild(actor.sprite);
    if (position) actor.sprite.position = position;
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