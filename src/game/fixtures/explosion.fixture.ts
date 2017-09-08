import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

export class Explosion extends Fixture {  

  constructor() {
    super();
    this._addAnimation();
  }

  protected _addAnimation(): void {
    let animation = new PIXI.extras.AnimatedSprite([
      PIXI.utils.TextureCache['animations/explosion/frame1.png'],
      PIXI.utils.TextureCache['animations/explosion/frame2.png'],
      PIXI.utils.TextureCache['animations/explosion/frame3.png'],
      PIXI.utils.TextureCache['animations/explosion/frame4.png'],
      PIXI.utils.TextureCache['animations/explosion/frame5.png'],
      PIXI.utils.TextureCache['animations/explosion/frame6.png'],
      PIXI.utils.TextureCache['animations/explosion/frame7.png'],
      PIXI.utils.TextureCache['animations/explosion/frame8.png']
    ]);
    animation.animationSpeed = .25;
    animation.play();
    animation.loop = false;
    animation.onComplete = () => animation.visible = false;
    this.container.addChild(animation);
  }

}