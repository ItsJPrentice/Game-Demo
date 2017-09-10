import * as PIXI from 'pixi.js';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { PhysicsEngine } from 'engine/physics/physicsEngine';

export class Stage extends Entity {

  protected _entities = new BehaviorSubject<Entity[]>([]);
  protected _physicsEngine = new PhysicsEngine(
    this._entities
        .map(entities => _(entities)
          .filter(entity => !!entity.body)
          .map(entity => entity.body)
          .value()
        )
  );

  constructor() {
    super();
  }

  protected _addEntity(entity: Entity, position?: PIXI.Point): void {
    this.container.addChild(entity.container);
    if (position) entity.container.position = position;
    this._entities.next(_.concat(this._entities.value, entity));
  }

  public update(delta: number): void {
    _.each(this._entities.value, entity => entity.update(delta));
    this._physicsEngine.update(delta);
  }

}