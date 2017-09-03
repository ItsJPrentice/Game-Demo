import * as PIXI from 'pixi.js';
import { Observable, AjaxRequest, AjaxResponse } from 'rxjs';
import * as _ from 'lodash';

interface IAssetsManifest {
  id: string,
  filename: string
}

export class AssetsManifestLoader {

  constructor() { }

  public loadAssetsFromManifest(manifestPath: string, onAssetsLoaded: () => void): void {
    this._getAssetsManifest(manifestPath)
        .subscribe(response => {
          this._addAssetsFromManifest(response.response);
          PIXI.loader.load(onAssetsLoaded);
        });
  }

  private _addAssetsFromManifest(manifest: IAssetsManifest) {
    _.each(manifest, filename => {
      PIXI.loader.add(filename, require('../../game/_assets/sprites/' + filename));
    });
  }
  
    private _getAssetsManifest(path: string): Observable<AjaxResponse> {    
      let request: AjaxRequest = {
        url: path,
        method: 'GET',
        responseType: 'json'
      }
      return Observable.ajax(request);
    }

}