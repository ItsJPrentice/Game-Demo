import * as PIXI from 'pixi.js';
import { SpriteService } from '../services/sprite.service';
import { Prop } from '../props/prop';
import { Actor } from '../actors/actor';
import { Player } from '../players/player';
import { KeyboardInput } from '../inputs/keyboard.input';
import { LoopService } from '../services/loop.service';
import { CollisionDetector } from '../utilities/collisionDetector';

export interface IBoundary {
  x: number,
  y: number,
  width: number,
  height: number
}

export class Stage {

  protected _container = new PIXI.Container();
  protected _boundary: IBoundary;
  protected _props = <Prop[]>[];
  protected _actors = <Actor[]>[];
  protected _players = <Player[]>[];
  protected _collisionDetector: CollisionDetector;

  constructor(detectCollisions: boolean) {
    this._container = new PIXI.Container();
    this._props = [];
    this._actors = [];
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
  
  protected _addProp(prop: Prop, position?: PIXI.Point): void {
    this._props.push(prop);
    this.container.addChild(prop.sprite);
    if (position) prop.sprite.position = position;
  }
  
  protected _addActor(actor: Actor, position?: PIXI.Point): void {
    this._actors.push(actor);
    this.container.addChild(actor.sprite);
    if (position) actor.sprite.position = position;
  }

  protected _addPlayer(player: Player): void {
    this._players.push(player);
  }

  protected _setupCollisionDetection(): void {
    this._collisionDetector = new CollisionDetector();
  }
  
  protected _update(): void {
    if (this._collisionDetector) this._collisionDetector.test();
  }

}