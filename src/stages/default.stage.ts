import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { SpriteService } from '../services/sprite.service';
import { Player } from '../objects/player.object';

export class DefaultStage extends Stage {

  protected _container: PIXI.Container;
  private _player: Player;

  constructor() {
    super();
    this._container = new PIXI.Container();
    this._init();
  }

  public get container(): PIXI.Container {
    return this._container;
  }

  protected _init(): void {
    this.container.addChild(SpriteService.getSprite('background'));
    this._player = new Player();
    this.container.addChild(this._player.sprite);
    this._player.sprite.anchor.set(.5,.5);
    this._player.sprite.position.set(8,8);
    this._player.sprite.rotation = 0;
  }
  
  /*  
  interface IContainConfig {
    x: number,
    y: number,
    width: number,
    height: number
  }
  
  export class SpriteUtils {
  
    public static contain(sprite: PIXI.Sprite, config: IContainConfig): void {
    }
  }
  */
}