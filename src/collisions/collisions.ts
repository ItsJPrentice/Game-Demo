import * as PIXI from 'pixi.js';
import { Actor } from '../actors/actor';
import { Prop } from '../props/prop';

export class Collision {

  readonly object1: any;
  readonly object2: any;
  readonly state: string;

  constructor(object1: any, object2: any, state: string) {
    this.object1 = object1;
    this.object2 = object2;
    this.state = state;
  }

}

export class ActorCollision extends Collision {

  readonly object1: Actor;
  readonly object2: Actor;
  readonly state: 'hit' | 'intersecting' | 'end';

  constructor(actor1: Actor, actor2: Actor, state: 'hit' | 'intersecting' | 'end') {
    super(actor1, actor2, state);
  }

}

export class PropCollision extends Collision {

  readonly object1: Actor;
  readonly object2: Prop;
  readonly state: 'hit' | 'intersecting' | 'end';

  constructor(actor: Actor, prop: Prop, state: 'hit' | 'intersecting' | 'end') {
    super(actor, prop, state);
  }

}

export class BoundaryCollision extends Collision {

  readonly object1: Actor;
  readonly object2: PIXI.Rectangle;
  readonly state: 'hit' | 'intersecting' | 'outside' | 'end';

  constructor(actor: Actor, boundary: PIXI.Rectangle, state: 'hit' | 'intersecting' | 'outside' | 'end') {
    super(actor, boundary, state);
  }

}