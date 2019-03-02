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
    data: {},
  },
  {
    path: 'add',
    component: EditDirectionComponent,
    resolve: {
      province: ProvinceResolverService
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'direction_terminal',
      item: 'directions'
    },

  },
  {
    path: ':direction/edit',
    component: EditDirectionComponent,
    resolve: {
      direction: DirectionResolverService
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'direction_terminal',
      item: 'directions'
    },

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectionsRoutingModule {
}
