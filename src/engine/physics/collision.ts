export class Collision {

  readonly type: 'hit' | 'ongoing' | 'end' | 'outside';

  constructor(type: 'hit' | 'ongoing' | 'end' | 'outside') {
    this.type = type;
  }

}