import * as PIXI from 'pixi.js';
import { AnimatedFixture } from 'engine/entities/animatedFixture.entity';

export class Explosion extends AnimatedFixture {
  

  constructor() {
    super(
      new PIXI.extras.AnimatedSprite([
        PIXI.utils.TextureCache['animations/explosion/frame1.png'],
        PIXI.utils.TextureCache['animations/explosion/frame2.png'],
        PIXI.utils.TextureCache['animations/explosion/frame3.png'],
        PIXI.utils.TextureCache['animations/explosion/frame4.png'],
        PIXI.utils.TextureCache['animations/explosion/frame5.png'],
        PIXI.utils.TextureCache['animations/explosion/frame6.png'],
        PIXI.utils.TextureCache['animations/explosion/frame7.png'],
        PIXI.utils.TextureCache['animations/explosion/frame8.png']
      ],
      true
    ));
    this.displayObject.animationSpeed = .25;
    this.displayObject.play();
    this.displayObject.loop = false;
    this.displayObject.onComplete = () => this.displayObject.visible = false;
  }

}