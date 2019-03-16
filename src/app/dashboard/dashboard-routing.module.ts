import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {ShowUserImagesComponent} from './show-user-images/show-user-images.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent
  },
  {
    path: 'images',
    component: ShowUserImagesComponent,
    data:{
      title: 'user_images_terminal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
