import { Entity } from 'engine/entities/entity';
import { HasPhysicsBody } from 'engine/entities/_mixins/hasPhysicsBody.entity';

export class Fixture extends HasPhysicsBody(Entity) {

  constructor() {
    super();
    this.physicsBody.isFixed = true;
  }

}