import * as PIXI from 'pixi.js';
import { Observable, AjaxRequest, AjaxResponse } from 'rxjs';
import * as _ from 'lodash';

interface ManifestEntry {
  id: string,
  path: string
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

  private _addAssetsFromManifest(manifest: ManifestEntry[]) {
    _.each(manifest, entry => {
      PIXI.loader.add(entry, require('game/_assets/' + entry));
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