import { Entity } from './entity';

export class Fixture extends Entity {

  public isSolid: boolean;

  constructor(isSolid?: boolean) {
    super();
    this.isSolid = !!isSolid;
  }

}