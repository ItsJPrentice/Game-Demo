import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { HasPhysicsBody } from 'engine/entities/_mixins/hasPhysicsBody.entity';
import { GameInput } from 'engine/inputs/game.inputs';
import { Player } from 'engine/players/player';

export class Actor extends HasPhysicsBody(Entity) {
  
  constructor() {
    super();
  }

}