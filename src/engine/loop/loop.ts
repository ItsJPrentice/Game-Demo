import * as PIXI from 'pixi.js';
import { Subject, Observable } from 'rxjs';

export class Loop {

  private _stream: Observable<number>
  
  constructor() {
    let subject = new Subject<number>();
    new PIXI.ticker.Ticker().add(delta => subject.next(delta)).start();
    this._stream = subject.asObservable();
  }

  public get stream(): Observable<number> {
    return this._stream;
  }

}