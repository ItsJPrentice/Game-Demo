import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs';

export class Player {

  private _inputStream: Subject<any>; //TODO: Define Input Generic Class
  private _outputStream: Observable<any>; // TODO Define Event Stream Generic Class;

  constructor() {
    this._inputStream = new Subject<Observable<any>>();
    this._outputStream = this._inputStream.asObservable().switchMap(stream => stream);
  }

  public set inputStream(inputStream: Observable<any>) {
    this._inputStream.next(inputStream);
  }

  public get outputStream(): Observable<any> {
    return this._outputStream;
  }
  
}