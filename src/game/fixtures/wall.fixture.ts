import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';
import { HasPhysicsBody } from 'engine/entities/_mixins/hasPhysicsBody.entity';

export class Wall extends HasPhysicsBody(Fixture) {
  
  constructor(width: number, height: number) {
    super();
    this._setSprite(width, height);
    this._setHitbox(width, height);
    this.physicsBody.type = 'solid';
    this.physicsBody.isFixed = true;
  }

  private _setSprite(width: number, height: number): void {
    let sprite = this._getTilingSprite('sprites/wall.png', width, height);
    this.container.addChild(sprite);
  }

}