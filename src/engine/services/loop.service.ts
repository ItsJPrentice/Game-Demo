import * as PIXI from 'pixi.js';
import { Subject, Observable } from 'rxjs';

export class LoopService {
  
  private constructor() { }

  private static _loop: Observable<number> = (() => {
    let subject = new Subject<number>();
    new PIXI.ticker.Ticker().add(delta => subject.next(delta)).start();
    return subject.asObservable();
  })();

  public static get loop(): Observable<number> {
    return this._loop;
  }

}