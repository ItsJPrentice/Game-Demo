import * as PIXI from 'pixi.js';
import { Observable, AjaxRequest, AjaxResponse } from 'rxjs';
import * as _ from 'lodash';
import { SpriteService } from './sprite.service';

interface IAssetsManifest {
  id: string,
  filename: string
}

export class AssetsService {

  private constructor() { }

  public static loadAssets(onLoad: () => void): void {
    this._loadSpriteAssetsFromManifest().subscribe(() => {
      PIXI.loader.load(onLoad);
    });
  }

  private static _loadSpriteAssetsFromManifest(): Observable<AjaxResponse> {
    let request: AjaxRequest = {
      url: '/sprite-assets-manifest.json',
      method: 'GET',
      responseType: 'json'
    }
    return Observable.ajax(request)
                     .do(data => this._onGetSpriteAssetsManifest(data.response));
  }

  private static _onGetSpriteAssetsManifest(manifest: IAssetsManifest) {
    _.each(manifest, filename => {
      PIXI.loader.add(filename, require('../assets/sprites/' + filename));
    });
  }

}