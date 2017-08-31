import * as PIXI from 'pixi.js';
import { SpriteService } from '../services/sprite.service';
import { Prop } from '../props/prop';
import { Actor } from '../actors/actor';
import { LoopService } from '../services/loop.service';

export interface IBoundary {
  x: number,
  y: number,
  width: number,
  height: number
}

export class Stage {

  protected _container: PIXI.Container;
  protected _boundary: IBoundary;
  protected _props: Prop[];
  protected _actors: Actor[];

  constructor() {
    this._container = new PIXI.Container();
    this._props = [];
    this._actors = [];
    LoopService.gameLoop.subscribe(() => this._update());
  }

  public get container(): PIXI.Container {
    return this._container;
  }
  
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
  
  protected _update(): void {
    this._detectCollisions();
  }

  protected _detectCollisions(): void {
  }

}