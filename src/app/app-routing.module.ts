import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {HomeComponent} from './auth/home/home.component';
import {UserResolver} from './shared/resolvers/user-resolver.service';
import {NonAuthGuard} from './shared/guards/non-auth.guard';
import {AuthGuard} from './shared/guards/auth.guard';
import {RoleGuard} from './shared/guards/role.guard';
import {CountriesResolver} from './shared/resolvers/countries-resolver.service';
import {ShowProvincesComponent} from './provinces/show-provinces/show-provinces.component';
import {DirectionResolverService} from './shared/resolvers/direction-resolver.service';
import {ProvinceResolverService} from './shared/resolvers/province-resolver.service';
import {EditDirectionComponent} from './directions/edit-direction/edit-direction.component';
import {EditProvinceComponent} from './provinces/edit-province/edit-province.component';
import {ShowDirectionsComponent} from './directions/show-directions/show-directions.component';
import {EditCountryComponent} from './countries/edit-country/edit-country.component';
import {EditLocationComponent} from './locations/edit-location/edit-location.component';
import {LocationResolverService} from './shared/resolvers/location-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'home'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'registration_terminal'
    },
    canActivate: [NonAuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'login'
    },
    canActivate: [NonAuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: {
      expectedRole: 'admin',
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'profile/:id',
    component: RegisterComponent,
    resolve: {
      user: UserResolver
    },
    data: {
      title: 'profile_terminal'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'world/countries',
    loadChildren: './countries/countries.module#CountriesModule',

  },
  {
    path: ':country/edit',
    component: EditCountryComponent,
    resolve: {
      country: CountriesResolver
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'country_terminal',
      item: 'countries',
      icon: 'flag'
    },

  },
  {
    path: ':country',
    loadChildren: './provinces/provinces.module#ProvincesModule',
  },
  {
    path: ':country/:province',
    loadChildren: './directions/directions.module#DirectionsModule',
  },
  {
    path: ':country/:province/:direction',
    loadChildren: './locations/locations.module#LocationsModule',

  },
  {
    path: ':country/:province/:direction/:location',
    loadChildren: './stories/stories.module#StoriesModule',
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      title: 'not_found'
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
