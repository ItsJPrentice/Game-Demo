import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { Loop } from 'engine/loop/loop';

export interface IGamepadState {
  axes: number[];
  buttons: GamepadButton[];
}

export class GamepadInput {
  
  private _stream: Observable<IGamepadState>;
  private _gamepad: Gamepad;

  constructor(gamepad: Gamepad) {
    this._gamepad = gamepad;
    this._stream = new Loop().stream.pipe(map(delta => this._getGamepadState()));
  }

  public get stream(): Observable<IGamepadState> {
    return this._stream;
  }

  private _getGamepadState(): IGamepadState {
    return {
      axes: navigator.getGamepads()[this._gamepad.index].axes,
      buttons: navigator.getGamepads()[this._gamepad.index].buttons
    }
  }

}