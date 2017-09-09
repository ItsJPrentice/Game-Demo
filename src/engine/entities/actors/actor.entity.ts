import { BehaviorSubject, Observable } from 'rxjs';
import { Entity } from 'engine/entities/entity';
import { GameInput } from 'engine/inputs/game.inputs';
import { Player } from 'engine/players/player';

export class Actor extends Entity {

  protected _input = new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>());
  protected _stream = this._input.asObservable().switchMap(event => event);
  
  constructor() {
    super();
    this._stream.subscribe(event => this._onInput(event));
  }
  
  public set input(input: Observable<GameInput>) {
    this._input.next(input);
  }

  public get stream(): Observable<GameInput> {
    return this._stream;
  }
  
  protected _onInput(input: GameInput): void { }

}