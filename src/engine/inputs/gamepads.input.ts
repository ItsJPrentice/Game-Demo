import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { GamepadInput, IGamepadState } from 'engine/inputs/gamepad.input';

export class GamepadsInput {

  private _gamepadInputs: GamepadInput[] = [];
  
  private _inputs: BehaviorSubject<Observable<any>>[] = [
    new BehaviorSubject<Observable<any>>(Observable.empty<any>()),
    new BehaviorSubject<Observable<any>>(Observable.empty<any>()),
    new BehaviorSubject<Observable<any>>(Observable.empty<any>()),
    new BehaviorSubject<Observable<any>>(Observable.empty<any>())
  ];

  private _streams: Observable<any>[] = [
    this._inputs[0].asObservable().switchMap(event => event),
    this._inputs[1].asObservable().switchMap(event => event),
    this._inputs[2].asObservable().switchMap(event => event),
    this._inputs[3].asObservable().switchMap(event => event)
  ];

  constructor() {
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
      this._inputs[index] = new BehaviorSubject<Observable<any>>(this._getGamepadInputStream(index));
      this._streams[index] = this._inputs[0].asObservable().switchMap(event => event);
    }
  }

  private _getGamepadInputStream(index: number): Observable<any> {
    return this._gamepadInputs[index] ? this._gamepadInputs[index].stream : Observable.empty<any>();
  }
  
  private _onGamepadConnected(event: GamepadEvent): void {
    this._addGamepad(event.gamepad);
    console.log('Inferno');
  }

  private _onGamepadDisconnected(event: GamepadEvent): void {
    this._removeGamepad(event.gamepad.index);
    console.log('Disco');
  }
}