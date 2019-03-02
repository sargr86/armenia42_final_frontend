import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowProvincesComponent} from './show-provinces/show-provinces.component';
import {ProvinceResolverService} from '../shared/resolvers/province-resolver.service';
import {AuthGuard} from '../shared/guards/auth.guard';
import {RoleGuard} from '../shared/guards/role.guard';
import {EditProvinceComponent} from './edit-province/edit-province.component';
import {CountriesResolver} from '../shared/resolvers/countries-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowProvincesComponent,
    data: {},
  },
  {
    path: 'add',
    component: EditProvinceComponent,
    resolve: {
      country: CountriesResolver
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'province_terminal',
      item: 'provinces'
    },

  },
  {
    path: ':province/edit',
    component: EditProvinceComponent,
    resolve: {
      province: ProvinceResolverService
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'province_terminal',
      item: 'provinces'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvincesRoutingModule { }
