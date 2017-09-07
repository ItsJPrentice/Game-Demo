import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { GameInputs, GameInput } from 'engine/inputs/game.inputs';
import { GamepadInput, IGamepadState } from 'engine/inputs/generic/gamepad.input';

export class GamepadInputs extends GameInputs {

  private _gamepadInputs: GamepadInput[] = [];
  
  private _inputs: BehaviorSubject<Observable<GameInput>>[] = [
    new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>()),
    new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>()),
    new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>()),
    new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>())
  ];

  protected _streams: Observable<GameInput>[] = [
    this._inputs[0].asObservable().switchMap(event => event),
    this._inputs[1].asObservable().switchMap(event => event),
    this._inputs[2].asObservable().switchMap(event => event),
    this._inputs[3].asObservable().switchMap(event => event)
  ];

  constructor() {
    super();
    _.each(this._getGamepads(), (gamepad, index) => this._mapGamepad(gamepad, index));
    Observable.fromEvent(window, 'ongamepadconnected').subscribe((event: GamepadEvent) => this._onGamepadConnected(event));
    Observable.fromEvent(window, 'ongamepaddisconnected').subscribe((event: GamepadEvent) => this._onGamepadDisconnected(event));
  }

  private _getGamepads(): Gamepad[] {
    if (navigator.getGamepads) return navigator.getGamepads();
    return [];
  }

  private _mapGamepad(gamepad: Gamepad, index: number): void {
    !!gamepad ? this._addGamepad(gamepad) : this._removeGamepad(index);
  }
  
  private _addGamepad(gamepad: Gamepad): void {
    this._gamepadInputs[gamepad.index] = new GamepadInput(gamepad);
    this._updateGamepadBindings(gamepad.index);
  }
  
  private _removeGamepad(index: number): void {
    this._gamepadInputs[index] = null;
    this._updateGamepadBindings(index);
  }

  private _updateGamepadBindings(index: number): void {
    if (!this._inputs[index]) {
      this._inputs[index].next(this._getGamepadInputStream(index));
    } else {
      this._inputs[index] = new BehaviorSubject<Observable<GameInput>>(this._getGamepadInputStream(index));
      this._streams[index] = this._inputs[0].asObservable().switchMap(event => event);
    }
  }

  private _getGamepadInputStream(index: number): Observable<GameInput> {
    return this._gamepadInputs[index] ? this._gamepadInputs[index].stream.map(state => this._mapGamepadState(state)) : Observable.empty<GameInput>();
  }

  private _mapGamepadState(state: IGamepadState): GameInput {
    return {
      movements: {
        x: Math.round(state.axes[0]),
        y: Math.round(state.axes[1])
      },
      actions: {
        action1: state.buttons[0].pressed || state.buttons[3].pressed,
        action2: state.buttons[1].pressed || state.buttons[2].pressed
      }
    }
  }
  
  private _onGamepadConnected(event: GamepadEvent): void {
    this._addGamepad(event.gamepad);
  }

  private _onGamepadDisconnected(event: GamepadEvent): void {
    this._removeGamepad(event.gamepad.index);
  }
}