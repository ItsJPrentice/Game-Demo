import { Observable, BehaviorSubject, Subscription } from 'rxjs';

export class Player {

  private _inputStream: BehaviorSubject<any>; //TODO: Define Input Generic Class
  private _outputStream: Observable<any>; // TODO Define Event Stream Generic Class;

  constructor() {
    this._inputStream = new BehaviorSubject<Observable<any>>(Observable.empty());
    this._outputStream = this._inputStream.asObservable().switchMap(stream => stream);
  }

  public set inputStream(inputStream: Observable<any>) {
    this._inputStream.next(inputStream);
  }

  public get outputStream(): Observable<any> {
    return this._outputStream;
  }
  
}