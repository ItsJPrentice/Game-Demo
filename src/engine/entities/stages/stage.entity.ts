import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { Entity } from 'engine/entities/entity';
import { Vector } from 'engine/math/vector';

export class Stage extends Entity {

  protected _entities = <Entity[]>[];

  constructor() {
    super();
    this.update$.subscribe(delta => this._updateEntities(delta));
  }

  protected _addEntity(entity: Entity, position?: Vector): void {
    this.container.addChild(entity.container);
    if (position) entity.setPosition(position);
    this._entities.push(entity);
  }

  private _updateEntities(delta: number): void {
    _.each(this._entities, entity => entity.update(delta));
  }

}