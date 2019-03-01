import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CountriesRoutingModule} from './countries-routing.module';
import {ShowCountriesComponent} from './show-countries/show-countries.component';
import {SharedModule} from '../shared/shared.module';
import { EditCountryComponent } from './edit-country/edit-country.component';

@NgModule({
    declarations: [ShowCountriesComponent, EditCountryComponent],
    imports: [
        CommonModule,
        CountriesRoutingModule,
        SharedModule
    ]
})
export class CountriesModule {
}
