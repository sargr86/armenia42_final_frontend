import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectionsRoutingModule } from './directions-routing.module';
import { ShowDirectionsComponent } from './show-directions/show-directions.component';
import {SharedModule} from '../shared/shared.module';
import { SaveDirectionComponent } from './save-direction/save-direction.component';

@NgModule({
  declarations: [ShowDirectionsComponent, SaveDirectionComponent],
  imports: [
    CommonModule,
    DirectionsRoutingModule,
    SharedModule
  ]
})
export class DirectionsModule { }
