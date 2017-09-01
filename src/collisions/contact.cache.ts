import { Map, Set } from 'immutable';

export class ContactCache {
  
  private _cache = Map<string, Set<string>>();

  constructor() { }

  public setContact(id1: string, id2: string): void {
    let set = this._cache.has(id1) ? this._cache.get(id1) : Set<string>();
    this._cache = this._cache.set(id1, set.add(id2));
  }

  public hasContact(id1: string, id2: string): boolean {
    if (!this._cache.has(id1)) return false;
    return this._cache.get(id1).has(id2);
  }

  public resetContact(id1: string, id2: string): void {
    if (this._cache.has(id1)) {
      let set = this._cache.get(id1);
      if (set) this._cache = this._cache.set(id1, set.delete(id2));
    }
  }

}