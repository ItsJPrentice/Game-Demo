import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';

const explosionFrames = _.range(1,8).map(frame => 'animations/explosion/frame' + frame + '.png');

export class Explosion extends Fixture {

  constructor() {
    super();
    this._addAnimation();
  }

  protected _addAnimation(): void {
    let animation = this._getAnimatingSprite(explosionFrames);
    animation.animationSpeed = .25;
    animation.play();
    animation.loop = false;
    animation.onComplete = () => animation.visible = false;
    this.container.addChild(animation);
  }

}