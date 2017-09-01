import { Entity } from '../entities/entity';

export class Collision {

  readonly entity: Entity;
  readonly type: 'hit' | 'ongoing' | 'end' | 'outside';

  constructor(entity: Entity, type: 'hit' | 'ongoing' | 'end' | 'outside') {
    this.entity = entity;
    this.type = type;
  }

}