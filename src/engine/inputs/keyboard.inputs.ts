import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { KeyboardInput } from 'engine/inputs/generic/keyboard.input';
import { GameInputs, GameInput } from 'engine/inputs/game.inputs';
import { Set } from 'immutable';
import { Loop } from 'engine/loop/loop';
import { Vector } from 'engine/math/vector';

interface KeyboardInputMap {
  movements: {
    up: string,
    right: string,
    down: string,
    left: string,
  },
  actions: {
    action1: string,
    action2: string,
  }
}

export class KeyboardInputs extends GameInputs {

  private _keyboardInput = new KeyboardInput();
  private _pressedKeys = Set<string>();

  private _inputMaps: KeyboardInputMap[] = [
    {
      movements: {
        up: 'ArrowUp',
        right: 'ArrowRight',
        down: 'ArrowDown',
        left: 'ArrowLeft'
      },
      actions: {
        action1: 'Space',
        action2: 'ShiftLeft'
      }
    }
  ];

  constructor() {
    super();
    this._keyboardInput.stream.subscribe(event => this._onKeyboardEvent(event));
    _.each(this._inputMaps, (inputMap, index) => this._mapStream(inputMap, index));
  }

  private _onKeyboardEvent(event: KeyboardEvent): void {
    if (event.type === 'keydown') {
      this._pressedKeys = this._pressedKeys.add(event.code);
    } else if (event.type === 'keyup') {
      this._pressedKeys = this._pressedKeys.remove(event.code);
    }
  }

  private _mapStream(inputMap: KeyboardInputMap, index: number): void {
    this._streams[index] = new Loop().stream.map(() => this._getGameInputFromMap(inputMap));
  }

  private _getGameInputFromMap(inputMap: KeyboardInputMap): GameInput {
    return {
      movement: new Vector(
        (() => {
          if (this._pressedKeys.has(inputMap.movements.down) && !this._pressedKeys.has(inputMap.movements.up)) return 1;
          if (!this._pressedKeys.has(inputMap.movements.down) && this._pressedKeys.has(inputMap.movements.up)) return -1;
          return 0;
        })(),
        (() => {
          if (this._pressedKeys.has(inputMap.movements.right) && !this._pressedKeys.has(inputMap.movements.left)) return 1;
          if (!this._pressedKeys.has(inputMap.movements.right) && this._pressedKeys.has(inputMap.movements.left)) return -1;
          return 0;
        })()
      ),
      actions: {
        action1: this._pressedKeys.has(inputMap.actions.action1),
        action2: this._pressedKeys.has(inputMap.actions.action2)
      }
    }
  }

}