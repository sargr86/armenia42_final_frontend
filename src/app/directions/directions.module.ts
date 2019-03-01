import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectionsRoutingModule } from './directions-routing.module';
import {SharedModule} from '../shared/shared.module';

import { ShowDirectionsComponent } from './show-directions/show-directions.component';
import { EditDirectionComponent } from './edit-direction/edit-direction.component';

@NgModule({
  declarations: [ShowDirectionsComponent, EditDirectionComponent],
  imports: [
    CommonModule,
    DirectionsRoutingModule,
    SharedModule
  ]
})
export class DirectionsModule { }
