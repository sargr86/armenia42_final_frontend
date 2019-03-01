import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LocationsRoutingModule} from './locations-routing.module';
import {SharedModule} from '../shared/shared.module';

import {EditLocationComponent} from './edit-location/edit-location.component';
import {ShowLocationsComponent} from './show-locations/show-locations.component';

@NgModule({
  declarations: [EditLocationComponent, ShowLocationsComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    SharedModule
  ]
})
export class LocationsModule {
}
