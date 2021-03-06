import { Observable, BehaviorSubject, empty, fromEvent } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import { GameInputs, GameInput } from 'engine/inputs/game.inputs';
import { GamepadInput, IGamepadState } from 'engine/inputs/generic/gamepad.input';
import { Vector } from 'engine/math/vector';

export class GamepadInputs extends GameInputs {

  private _gamepadInputs: GamepadInput[] = [];
  
  private _inputs = [
    new BehaviorSubject<Observable<GameInput>>(empty()),
    new BehaviorSubject<Observable<GameInput>>(empty()),
    new BehaviorSubject<Observable<GameInput>>(empty()),
    new BehaviorSubject<Observable<GameInput>>(empty())
  ];

  protected _streams: Observable<GameInput>[] = [
    this._inputs[0].asObservable().pipe(switchMap(event => event)),
    this._inputs[1].asObservable().pipe(switchMap(event => event)),
    this._inputs[2].asObservable().pipe(switchMap(event => event)),
    this._inputs[3].asObservable().pipe(switchMap(event => event))
  ];

  constructor() {
    super();
    _.each(this._getGamepads(), (gamepad, index) => this._mapGamepad(gamepad, index));
    fromEvent(window, 'ongamepadconnected').subscribe((event: GamepadEvent) => this._onGamepadConnected(event));
    fromEvent(window, 'ongamepaddisconnected').subscribe((event: GamepadEvent) => this._onGamepadDisconnected(event));
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
      this._streams[index] = this._inputs[0].asObservable().pipe(switchMap(event => event));
    }
  }

  private _getGamepadInputStream(index: number): Observable<GameInput> {
    return this._gamepadInputs[index] ? this._gamepadInputs[index].stream.pipe(map(state => this._mapGamepadState(state))) : empty();
  }

  private _mapGamepadState(state: IGamepadState): GameInput {
    return {
      movement: new Vector([Math.round(state.axes[0]), Math.round(state.axes[1])]),
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