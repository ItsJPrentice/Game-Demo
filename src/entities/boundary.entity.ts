import * as PIXI from 'pixi.js';
import { Entity } from './entity';

export class BoundaryEntity extends Entity {

  private _shape: PIXI.Rectangle;

  constructor(shape: PIXI.Rectangle) {
    super();
    this._shape = shape;
  }

  public get shape(): PIXI.Rectangle {
    return this._shape;
  }

}