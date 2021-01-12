import * as PIXI from 'pixi.js';
import { Observable } from 'rxjs';
import { AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import * as _ from 'lodash';
import { AjaxObservable } from 'rxjs/internal/observable/dom/AjaxObservable';
import { ENGINE_METHOD_DIGESTS } from 'constants';

interface ManifestEntry {
  id: string,
  path: string
}

export class AssetsManifestLoader {

  private _loader: PIXI.Loader;

  constructor() {
    this._loader = new PIXI.Loader();
  }

  public loadAssetsFromManifest(manifestPath: string, onAssetsLoaded: () => void): void {
    this._getAssetsManifest(manifestPath)
        .subscribe(response => {
          this._addAssetsFromManifest(response.response);
          this._loader.load(onAssetsLoaded);
        });
  }

  private _addAssetsFromManifest(manifest: ManifestEntry[]) {
    _.each(manifest, entry => {
      this._loader.add(entry, require('game/_assets/' + entry));
    });
  }
  
    private _getAssetsManifest(path: string): Observable<AjaxResponse> {    
      let request: AjaxRequest = {
        url: path,
        method: 'GET',
        responseType: 'json'
      }
      return new AjaxObservable(request);
    }

}