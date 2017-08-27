import { Observable } from 'rxjs';

export class KeyboardService {

  private constructor() { }

  public static keyPresses: Observable<KeyboardEvent>;

  public static init(): void {
    let keyDowns: Observable<KeyboardEvent> = Observable.fromEvent(document, 'keydown'),
        keyUps: Observable<KeyboardEvent> = Observable.fromEvent(document, 'keyup');
    this.keyPresses = keyDowns.merge(keyUps)
                              .groupBy((e) => e.keyCode)
                              .map(group => group.distinctUntilChanged(null, e => e.type))
                              .mergeAll();
  }

}