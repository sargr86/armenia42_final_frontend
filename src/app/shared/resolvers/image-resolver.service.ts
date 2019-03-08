import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ImagesService} from '../services/images.service';
import {GetLangPipe} from '../pipes/get-lang.pipe';

@Injectable({
  providedIn: 'root'
})
export class ImageResolver {

  constructor(
    private _images: ImagesService,
    private  getLang: GetLangPipe
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    return this._images.getImageById({id: route.params.image_id, lang: this.getLang.transform()});
  }
}
