import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from "./auth/register/register.component";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";
import {LoginComponent} from "./auth/login/login.component";
import {HomeComponent} from "./auth/home/home.component";
import {UserResolver} from "./shared/resolvers/user-resolver.service";
import {NonAuthGuard} from "./shared/guards/non-auth.guard";
import {AuthGuard} from "./shared/guards/auth.guard";
import {RoleGuard} from "./shared/guards/role.guard";
import {SaveCountryComponent} from "./countries/save-country/save-country.component";
import {CountriesResolver} from "./shared/resolvers/countries-resolver.service";
import {ShowProvincesComponent} from "./provinces/show-provinces/show-provinces.component";
import {SaveProvinceComponent} from './provinces/save-province/save-province.component';
import {ProvinceResolverService} from './shared/resolvers/province-resolver.service';
import {ShowDirectionsComponent} from './directions/show-directions/show-directions.component';
import {DirectionResolverService} from './shared/resolvers/direction-resolver.service';
import {SaveDirectionComponent} from './directions/save-direction/save-direction.component';

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
    path: ':country/add',
    component: SaveProvinceComponent,
    resolve: {
      country: CountriesResolver
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'province_terminal'
    },

  },
  {
    path: ':country/edit',
    component: SaveCountryComponent,
    resolve: {
      country: CountriesResolver
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'country_terminal'
    },

  },
  {
    path: ':country',
    component: ShowProvincesComponent,
    data: {
    },
  },
  {
    path: ':country/:province/edit',
    component: SaveProvinceComponent,
    resolve: {
      province: ProvinceResolverService
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'province_terminal'
    },

  },
  {
    path: ':country/:province',
    component: ShowDirectionsComponent,
    data: {
    },
  },
  {
    path: ':country/:province/:direction/edit',
    component: SaveDirectionComponent,
    resolve: {
      province: DirectionResolverService
    },
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: 'admin',
      title: 'direction_terminal'
    },

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
