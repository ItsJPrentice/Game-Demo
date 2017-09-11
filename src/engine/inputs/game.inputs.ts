import { Observable } from 'rxjs';
import { Vector } from 'engine/math/vector';

export interface ActionInputs {
  action1: boolean,
  action2: boolean
}

export interface GameInput {
  movement: Vector,
  actions: ActionInputs
}

export class GameInputs {

  protected _streams: Observable<GameInput>[] = [];

  public get streams(): Observable<GameInput>[] {
    return this._streams;
  }

  public getStream(index: number): Observable<GameInput> {
    return this.streams[index];
  }

}