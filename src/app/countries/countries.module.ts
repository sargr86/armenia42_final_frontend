import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CountriesRoutingModule} from './countries-routing.module';
import {ShowCountriesComponent} from './show-countries/show-countries.component';
import {SharedModule} from "../shared/shared.module";
import { SaveCountryComponent } from './save-country/save-country.component';

@NgModule({
    declarations: [ShowCountriesComponent, SaveCountryComponent],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        SharedModule
    ]
})
export class CountriesModule {
}
