import { Observable, BehaviorSubject, Scheduler } from 'rxjs';
import * as _ from 'lodash';
import { LoopService } from 'engine/services/loop.service';

export interface IGamepadState {
  axes: number[];
  buttons: GamepadButton[];
}

export class GamepadInput {
  
  private _stream: Observable<IGamepadState>;
  private _gamepad: Gamepad;
  private _frameStream = LoopService.loop;

  constructor(gamepad: Gamepad) {
    this._gamepad = gamepad;
    this._stream = LoopService.loop.map(delta => this._getGamepadState());
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