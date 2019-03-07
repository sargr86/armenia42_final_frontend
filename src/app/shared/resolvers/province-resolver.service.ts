import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ReplaceAllPipe} from '../pipes/replace-all.pipe';
import {GetLangPipe} from '../pipes/get-lang.pipe';
import {ProvincesService} from '../services/provinces.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceResolverService {

  constructor(
    private replace: ReplaceAllPipe,
    private getLang: GetLangPipe,
    private provinces: ProvincesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const params = route.params;
    const province = params.province ? this.replace.transform(params.province) : '';
    const country = params.country ? this.replace.transform(params.country) : '';
    return this.provinces.getByName({province: province, country: country, lang: this.getLang.transform()});
  }
}
