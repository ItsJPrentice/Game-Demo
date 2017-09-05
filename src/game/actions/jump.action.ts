import * as PIXI from 'pixi.js';

export class JumpAction {

  private _velocity: number;
  private _deltaTime = 0;

  constructor(jumpVelocity: number) {
    this._velocity = jumpVelocity;
  }

  public getNextVelocity(gravity: number): number {
    let velocity = this._velocity + gravity * this._deltaTime;
    this._deltaTime += 1;
    this._velocity = velocity;
    return velocity;
  }

}