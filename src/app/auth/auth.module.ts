import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [RegisterComponent, LoginComponent, HomeComponent],
    imports: [
        CommonModule,
        SharedModule
    ]
})
export class AuthModule {
}
