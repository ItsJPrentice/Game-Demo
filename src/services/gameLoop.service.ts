import { Observable, Scheduler } from 'rxjs';

export class GameLoopService {
  
  private constructor() { }

  private static _loop = Observable.of(null, Scheduler.animationFrame).repeat();

  public static get loop(): Observable<any> {
    return this._loop;
  }

}