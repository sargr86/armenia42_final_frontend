import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {RightSidebarComponent} from './right-sidebar/right-sidebar.component';
import {SharedModule} from '../shared/shared.module';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    RightSidebarComponent,
    LeftSidebarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NavBarComponent,
    RightSidebarComponent,
    LeftSidebarComponent
  ]
})
export class LayoutModule {
}
