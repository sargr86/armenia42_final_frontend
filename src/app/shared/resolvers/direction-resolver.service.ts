import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ReplaceAllPipe} from '../pipes/replace-all.pipe';
import {GetLangPipe} from '../pipes/get-lang.pipe';
import {DirectionsService} from '../services/directions.service';

@Injectable({
  providedIn: 'root'
})
export class DirectionResolverService {

  constructor(
    private replace: ReplaceAllPipe,
    private getLang: GetLangPipe,
    private directions: DirectionsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const params = route.params;
    const direction = params.direction ? this.replace.transform(params.direction) : '';
    return this.directions.getByName({
      name_en: direction,
      parent_name: params.province,
      lang: this.getLang.transform()
    });
  }
}
