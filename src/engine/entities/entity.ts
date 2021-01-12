import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import * as _ from 'lodash';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Vector } from 'engine/math/vector';

export class Entity {
  
  readonly id: string;
  private _container = new PIXI.Container();
  private _update$ = new Subject<number>();
  private _position$ = new BehaviorSubject<Vector>(new Vector());

  constructor() {
    this.id = UUID.v4();
    this._position$.subscribe(position => this._updateContainerPosition(position));
  }

  public get container(): PIXI.Container {
    return this._container;
  }
  
  public get update$(): Observable<number> {
    return this._update$.asObservable();
  }

  public get position$(): Observable<Vector> {
    return this._position$.asObservable();
  }
  
  public update(delta: number): void {
    this._update$.next(delta);
  }

  public setPosition(position: Vector): void {
    this._position$.next(position);
  }

  private _updateContainerPosition(position: Vector): void {
    this.container.position.set(position.x, position.y);
  }

  // TODO: Refactor into Sprite utility class
  
  protected _getSprite(textureId: string, position?: PIXI.Point): PIXI.Sprite {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache[textureId]);
    if (position) sprite.position = position;
    return sprite;
  }
  
  protected _getTilingSprite(textureId: string, width: number, height: number, position?: PIXI.Point): PIXI.Sprite {
    let sprite = new PIXI.TilingSprite(PIXI.utils.TextureCache[textureId]);
    sprite.width = width;
    sprite.height = height;
    if (position) sprite.position = position;
    return sprite;
  }
  
  protected _getAnimatingSprite(textureIds: string[], position?: PIXI.Point): PIXI.AnimatedSprite {
    let sprite = new PIXI.AnimatedSprite(_.map(textureIds, textureId => PIXI.utils.TextureCache[textureId]));
    if (position) sprite.position = position;
    return sprite;
  }

}