import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {UsersModule} from "../users/users.module";
import {SharedModule} from "../shared/shared.module";
import { ManageImagesComponent } from './manage-images/manage-images.component';

@NgModule({
  declarations: [DashboardComponent, ManageImagesComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
      UsersModule,
      SharedModule
  ]
})
export class AdminModule { }
