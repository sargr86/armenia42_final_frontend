import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';

// Toastr & Translate modules
import {ToastrModule} from 'ngx-toastr';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AuthModule} from './auth/auth.module';
import {AuthService} from './shared/services/auth.service';

import {JwtModule} from '@auth0/angular-jwt';
import {RequestInterceptor} from './shared/helpers/http.interceptor';
import {SaveUserInfoService} from './shared/services/save-user-info.service';
import {LayoutModule} from './layout/layout.module';
import {MaterialModule} from './shared/modules/material.module';
import {SubjectService} from './shared/services/subject.service';
import {UserResolver} from './shared/resolvers/user-resolver.service';
import {UsersService} from './shared/services/users.service';
import {AuthGuard} from './shared/guards/auth.guard';
import {NonAuthGuard} from './shared/guards/non-auth.guard';
import {RoleGuard} from './shared/guards/role.guard';
import {CountriesModule} from './countries/countries.module';
import {CountriesResolver} from './shared/resolvers/countries-resolver.service';
import {ProvincesModule} from './provinces/provinces.module';

// Services
import {ProvincesService} from './shared/services/provinces.service';
import {CountriesService} from './shared/services/countries.service';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/languages/', '.json');
}

// Token getter for JWT module
export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({disableTimeOut: false}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    }),
    AuthModule,
    LayoutModule,
    MaterialModule,
    CountriesModule,
    ProvincesModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    SubjectService,
    SaveUserInfoService,
    UsersService,
    CountriesService,
    ProvincesService,
    UserResolver,
    CountriesResolver,
    AuthGuard,
    NonAuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
