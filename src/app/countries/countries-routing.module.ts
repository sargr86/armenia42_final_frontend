import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowCountriesComponent} from './show-countries/show-countries.component';
import {SaveCountryComponent} from './save-country/save-country.component';

const routes: Routes = [
  {
    path: '',
    component: ShowCountriesComponent,
    data: {
      title: 'countries'
    }
  },
  {
    path: 'add',
    component: SaveCountryComponent,
    data: {
      expectedRole: 'admin',
      title: 'country_terminal',
      item: 'countries'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {
}
