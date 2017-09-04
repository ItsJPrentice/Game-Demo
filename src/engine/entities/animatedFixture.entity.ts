import { Fixture } from './fixture.entity';

export class AnimatedFixture extends Fixture {
  
  protected _displayObject: PIXI.extras.AnimatedSprite;

  constructor(sprite: PIXI.extras.AnimatedSprite, isSolid?: boolean) {
    super(!!isSolid);
    this._displayObject = sprite;
  }
  
  public get displayObject(): PIXI.extras.AnimatedSprite {
    return this._displayObject;
  }

}