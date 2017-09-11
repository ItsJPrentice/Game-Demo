import { BehaviorSubject, Observable} from 'rxjs';
import * as _ from 'lodash';
import { Constructor } from 'engine/utilities/constructor';
import { Entity } from 'engine/entities/entity';
import { GameInput } from 'engine/inputs/game.inputs';

export function HasGameInput<T extends Constructor<Entity>>(Base: T) {

  return class extends Base {
    
    private _inputSource = new BehaviorSubject<Observable<GameInput>>(Observable.empty<GameInput>());
    private _inputStream = this._inputSource.asObservable().switchMap(event => event);
  
    constructor(...args: any[]) {
      super(...args);
    }

    public set inputSource(source: Observable<GameInput>) {
      this._inputSource.next(source);
    }

    public get inputStream(): Observable<GameInput> {
      return this._inputStream;
    }
  
  }

}