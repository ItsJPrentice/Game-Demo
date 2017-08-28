import { Observable } from 'rxjs';

export class KeyboardService {

  private constructor() { }

  private static _keyDowns: Observable<KeyboardEvent> = Observable.fromEvent(document, 'keydown');
  private static _keyUps: Observable<KeyboardEvent> = Observable.fromEvent(document, 'keyup');
  private static _keyPresses: Observable<KeyboardEvent>;

  public static get keyPresses(): Observable<KeyboardEvent> {
    if (!this._keyPresses) {
      this._keyPresses = this._keyDowns.merge(this._keyUps)
        .groupBy((e) => e.keyCode)
        .map(group => group.distinctUntilChanged(null, e => e.type))
        .mergeAll();
    }
    return this._keyPresses;
  }

}