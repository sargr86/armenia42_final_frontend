import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvincesRoutingModule } from './provinces-routing.module';
import { ShowProvincesComponent } from './show-provinces/show-provinces.component';
import {SharedModule} from '../shared/shared.module';
import { SaveProvinceComponent } from './save-province/save-province.component';

@NgModule({
  declarations: [ShowProvincesComponent, SaveProvinceComponent],
  imports: [
    CommonModule,
    ProvincesRoutingModule,
    SharedModule
  ]
})
export class ProvincesModule { }
