import * as PIXI from 'pixi.js';
import { Fixture } from 'engine/entities/fixtures/fixture.entity';
import { HasPhysicsBody } from 'engine/entities/_mixins/hasPhysicsBody.entity';
import { Vector } from 'engine/math/vector';
import { Rectangle } from 'engine/math/rectangle';

export class Wall extends HasPhysicsBody(Fixture) {

  protected _dimensions: Vector;
  
  constructor(dimensions: Vector) {
    super();
    this._dimensions = dimensions;
    this._setSprite();
    this._setHitbox();
    this.physicsBody.isFixed = true;
  }

  private _setSprite(): void {
    let sprite = this._getTilingSprite(
      'sprites/wall.png',
      this._dimensions.x,
      this._dimensions.y
    );
    this.container.addChild(sprite);
  }
  
  protected _getHitbox(): Rectangle {
    return new Rectangle(this._dimensions);
  }

}