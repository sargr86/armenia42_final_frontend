import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ReplaceAllPipe} from '../pipes/replace-all.pipe';
import {GetLangPipe} from '../pipes/get-lang.pipe';
import {LocationsService} from '../services/locations.service';

@Injectable({
  providedIn: 'root'
})
export class LocationResolverService {

  constructor(
    private replace: ReplaceAllPipe,
    private getLang: GetLangPipe,
    private locations: LocationsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const params = route.params;
    const location = params.location ? this.replace.transform(params.location) : '';
    return this.locations.getByName({
      name_en: location,
      parent_name: params.direction,
      lang: this.getLang.transform()
    });
  }
}
