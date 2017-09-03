import { Observable } from 'rxjs';

export class KeyboardInput {
  
  private _keyDowns: Observable<KeyboardEvent>; 
  private _keyUps: Observable<KeyboardEvent>;
  private _stream: Observable<KeyboardEvent>;

  constructor() {
    this._keyDowns = Observable.fromEvent(document, 'keydown');
    this._keyUps = Observable.fromEvent(document, 'keyup');
    this._stream = this._keyDowns
                       .merge(this._keyUps)
                       .groupBy((e) => e.keyCode)
                       .map(group => group.distinctUntilChanged(null, e => e.type))
                       .mergeAll();
  }

  public get stream(): Observable<KeyboardEvent> {
    return this._stream;
  }

}