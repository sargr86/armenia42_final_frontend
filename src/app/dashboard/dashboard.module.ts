import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {SharedModule} from '../shared/shared.module';
import { ShowUserImagesComponent } from './show-user-images/show-user-images.component';

@NgModule({
  declarations: [ UserDashboardComponent, ShowUserImagesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
}
