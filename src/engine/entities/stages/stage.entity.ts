import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { PhysicsEngine } from 'engine/physics/physicsEngine';

export class Stage extends Entity {

  protected _entities = <Entity[]>[];

  constructor() {
    super();
    this.updateStream.subscribe(delta => this._updateEntities(delta));
  }

  protected _addEntity(entity: Entity, position?: PIXI.Point): void {
    this.container.addChild(entity.container);
    if (position) entity.container.position = position;
    this._entities.push(entity);
  }

  private _updateEntities(delta: number): void {
    _.each(this._entities, entity => entity.update(delta));
  }

}