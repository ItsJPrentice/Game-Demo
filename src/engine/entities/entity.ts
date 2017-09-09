import * as PIXI from 'pixi.js';
import * as UUID from 'uuid';
import * as _ from 'lodash';

export class Entity {
  
  readonly id: string;
  private _container = new PIXI.Container();
  protected _velocity = new PIXI.Point(0,0);

  constructor(isSolid?: boolean) {
    this.id = UUID.v4();
  }

  public get container(): PIXI.Container {
    return this._container;
  }
  
  public update(deltaTime: number): void { }
  
  protected _getSprite(textureId: string, position?: PIXI.Point): PIXI.Sprite {
    let sprite = new PIXI.Sprite(PIXI.utils.TextureCache[textureId]);
    if (position) sprite.position = position;
    return sprite;
  }
  
  protected _getTilingSprite(textureId: string, width: number, height: number, position?: PIXI.Point): PIXI.Sprite {
    let sprite = new PIXI.extras.TilingSprite(PIXI.utils.TextureCache[textureId]);
    sprite.width = width;
    sprite.height = height;
    if (position) sprite.position = position;
    return sprite;
  }
  
  protected _getAnimatingSprite(textureIds: string[], position?: PIXI.Point): PIXI.extras.AnimatedSprite {
    let sprite = new PIXI.extras.AnimatedSprite(_.map(textureIds, textureId => PIXI.utils.TextureCache[textureId]));
    if (position) sprite.position = position;
    return sprite;
  }

}