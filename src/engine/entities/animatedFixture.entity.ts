export class AnimatedFixture {
  
  protected _displayObject: PIXI.extras.AnimatedSprite;

  constructor(sprite: PIXI.extras.AnimatedSprite, isSolid?: boolean) {
    this._displayObject = sprite;
  }
  
  public get displayObject(): PIXI.extras.AnimatedSprite {
    return this._displayObject;
  }

}