import * as PIXI from 'pixi.js';
import { Subject, Observable } from 'rxjs';

export class Loop {

  private _stream: Observable<number>;
  
  constructor() {
    let subject = new Subject<number>(),
        ticker = new PIXI.Ticker();
    this._stream = subject.asObservable();
    ticker
      .add(delta => subject.next(delta))
      .start();
  }

  public get stream(): Observable<number> {
    return this._stream;
  }

}