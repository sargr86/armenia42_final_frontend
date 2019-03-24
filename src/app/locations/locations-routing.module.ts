import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowLocationsComponent} from './show-locations/show-locations.component';
import {EditLocationComponent} from './edit-location/edit-location.component';
import {DirectionResolverService} from '../shared/resolvers/direction-resolver.service';
import {LocationResolverService} from '../shared/resolvers/location-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowLocationsComponent,
    data: {
      item: 'locations',
      title: 'locations',
      parent: 'direction'
    },
    resolve: {
      direction: DirectionResolverService
    },
  },
  {
    path: 'add',
    component: EditLocationComponent,
    resolve: {
      direction: DirectionResolverService
    },
    data: {
      item: 'locations',
      title: 'location_terminal',
      icon: 'map-marker'
    }
  },
  {
    path: ':location/edit',
    component: EditLocationComponent,
    resolve: {
      location: LocationResolverService
    },
    data: {
      item: 'locations',
      title: 'location_terminal',
      icon: 'map-marker'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule {
}
