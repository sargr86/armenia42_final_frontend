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
