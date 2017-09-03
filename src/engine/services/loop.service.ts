import { Observable, Scheduler } from 'rxjs';

export class LoopService {
  
  private constructor() { }

  private static _gameLoop = Observable.of(null, Scheduler.animationFrame).repeat();

  public static get gameLoop(): Observable<any> {
    return this._gameLoop;
  }

}