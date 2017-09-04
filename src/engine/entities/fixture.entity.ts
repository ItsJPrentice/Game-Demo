import { Entity } from './entity';

export class Fixture extends Entity {

  constructor(isSolid?: boolean) {
    super(!!isSolid);
  }

}