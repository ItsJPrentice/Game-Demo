import { Fixture } from './fixture.entity';

export class TilingFixture extends Fixture {
  
  protected _displayObject: PIXI.extras.TilingSprite;

  constructor(
    sprite: PIXI.extras.TilingSprite,
    width: number,
    height: number,
    isSolid?: boolean
  ) {
    super(!!isSolid);
    this._displayObject = sprite;
    this._displayObject.width = width;
    this._displayObject.height = height;
  }
  
  public get displayObject(): PIXI.extras.TilingSprite {
    return this._displayObject;
  }

}