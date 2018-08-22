import { Observable, BehaviorSubject, empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GameInput } from 'engine/inputs/game.inputs';

export class Player {

  private _input: BehaviorSubject<Observable<GameInput>>;
  private _stream: Observable<GameInput>;

  constructor() {
    this._input = new BehaviorSubject<Observable<GameInput>>(empty());
    this._stream = this._input.asObservable().pipe(switchMap(event => event));
  }

  public set input(input: Observable<GameInput>) {
    this._input.next(input);
  }

  public get stream(): Observable<GameInput> {
    return this._stream;
  }
  
}