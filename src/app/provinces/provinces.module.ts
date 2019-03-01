import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProvincesRoutingModule} from './provinces-routing.module';
import {SharedModule} from '../shared/shared.module';

import {ShowProvincesComponent} from './show-provinces/show-provinces.component';
import { EditProvinceComponent } from './edit-province/edit-province.component';

@NgModule({
  declarations: [ShowProvincesComponent, EditProvinceComponent],
  imports: [
    CommonModule,
    ProvincesRoutingModule,
    SharedModule
  ]
})
export class ProvincesModule {
}
