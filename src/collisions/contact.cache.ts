interface IdCache {
  [ id: string ]: string;
}

export class ContactCache {
  
  private _ids: IdCache;

  constructor() {
    this._ids = {};
  }

}