import { Observable } from 'rxjs';

export interface MovementInputs {
  x: number,
  y: number
}

export interface ActionInputs {
  action1: boolean,
  action2: boolean
}

export interface GameInput {
  movements: MovementInputs,
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