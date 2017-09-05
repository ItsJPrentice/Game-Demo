import { Observable, BehaviorSubject, Subscription } from 'rxjs';

export interface IPlayerEvent {
  type: 'start' | 'stop';
  name: string;
}

export class Player {

  private _input: BehaviorSubject<Observable<KeyboardEvent>>;
  private _stream: Observable<IPlayerEvent>;

  constructor() {
    this._input = new BehaviorSubject<Observable<KeyboardEvent>>(Observable.empty<KeyboardEvent>());
    this._stream = this._input
                       .asObservable()
                       .switchMap(event => event)
                       .map(this._mapKeyboardEventToPlayerEvent);
  }

  public set input(input: Observable<KeyboardEvent>) {
    this._input.next(input);
  }

  public get stream(): Observable<IPlayerEvent> {
    return this._stream;
  }

  private _mapKeyboardEventToPlayerEvent(keyboardEvent: KeyboardEvent): IPlayerEvent {
    let playerEvent: IPlayerEvent = {
      type: keyboardEvent.type === 'keydown' ? 'start' : 'stop',
      name: null
    };
    switch (keyboardEvent.code) {
      case 'ArrowUp':    playerEvent.name = 'moveUp'; break;
      case 'ArrowRight': playerEvent.name = 'moveRight'; break;
      case 'ArrowDown':  playerEvent.name = 'moveDown'; break;
      case 'ArrowLeft':  playerEvent.name = 'moveLeft'; break;
      case 'Space':      playerEvent.name = 'action1'; break;
      case 'ShiftLeft':  playerEvent.name = 'action2'; break;
      default: break;
    }
    return playerEvent;
  }
  
}