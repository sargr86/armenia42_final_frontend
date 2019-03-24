import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProvinceResolverService} from '../shared/resolvers/province-resolver.service';
import {AuthGuard} from '../shared/guards/auth.guard';
import {ShowDirectionsComponent} from './show-directions/show-directions.component';
import {EditDirectionComponent} from './edit-direction/edit-direction.component';
import {RoleGuard} from '../shared/guards/role.guard';
import {DirectionResolverService} from '../shared/resolvers/direction-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowDirectionsComponent,
    resolve: {
      province: ProvinceResolverService
    },
    data: {
      parent: 'province'
    },
  },
  {
    path: 'add',
    component: EditDirectionComponent,
    resolve: {
      province: ProvinceResolverService
    },
    canActivate: [AuthGuard],
    data: {
      title: 'directions',
      item: 'directions',
      icon: 'directions'
    },

  },
  {
    path: ':direction/edit',
    component: EditDirectionComponent,
    resolve: {
      direction: DirectionResolverService
    },
    canActivate: [AuthGuard],
    data: {
      title: 'direction_terminal',
      item: 'directions',
      icon: 'directions'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectionsRoutingModule {
}
