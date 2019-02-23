import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from "@angular/router";
import {CountriesService} from "../services/countries.service";
import {ReplaceAllPipe} from "../pipes/replace-all.pipe";
import {GetLangPipe} from "../pipes/get-lang.pipe";

@Injectable()
export class CountriesResolver implements Resolve<any> {

    constructor(
        private countries: CountriesService,
        private replace: ReplaceAllPipe,
        private getLang: GetLangPipe
    ) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        let params = route.params;
        let country = params.country ? this.replace.transform(params.country) : "armenia";
        return this.countries.getByName({name_en:country,lang:this.getLang.transform()});
    }
}
