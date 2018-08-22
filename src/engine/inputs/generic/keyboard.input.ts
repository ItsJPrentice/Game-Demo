import { Observable, fromEvent } from 'rxjs';
import { merge, groupBy, map, mergeAll, distinctUntilChanged } from 'rxjs/operators';

export class KeyboardInput {
  
  private _keyDowns: Observable<KeyboardEvent>; 
  private _keyUps: Observable<KeyboardEvent>;
  private _stream: Observable<KeyboardEvent>;

  constructor() {
    this._keyDowns = fromEvent<KeyboardEvent>(document, 'keydown');
    this._keyUps = fromEvent<KeyboardEvent>(document, 'keyup');
    this._stream = this._keyDowns.pipe(
      merge(this._keyUps),
      groupBy((e) => e.keyCode),
      map(group => group.pipe(distinctUntilChanged(null, e => e.type))),
      mergeAll()
    );
  }

  public get stream(): Observable<KeyboardEvent> {
    return this._stream;
  }

}