import * as PIXI from 'pixi.js';
import { Stage } from './stage';
import { SpriteService } from '../services/sprite.service';

export class DefaultStage extends Stage {

  protected _container: PIXI.Container;

  constructor() {
    super();
    this._container = new PIXI.Container();
    this._init();
  }

  public get container(): PIXI.Container {
    return this._container;
  }

  protected _init(): void {
    this._container.addChild(SpriteService.Sprites.background);
    this._container.addChild(SpriteService.Sprites.token2);
    SpriteService.Sprites.token2.anchor.set(2, .5);
    SpriteService.Sprites.token2.position.set(8,8);
    SpriteService.Sprites.token2.rotation = 0;
  }

  public update(): void {
    SpriteService.Sprites.token2.rotation += .25;
    SpriteService.Sprites.token2.position.x += 1;
    SpriteService.Sprites.token2.position.y += 1;
  }
}