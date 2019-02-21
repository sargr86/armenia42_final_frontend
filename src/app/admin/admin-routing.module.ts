import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ShowUsersComponent} from "../users/show-users/show-users.component";

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data:{
            title: 'admin_dashboard'
        }
    },
    {
        path:'users',
        component:ShowUsersComponent,
        data:{
            title:'users_terminal'
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
