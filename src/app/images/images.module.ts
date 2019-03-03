import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImagesRoutingModule} from './images-routing.module';
import {ShowImagesComponent} from './show-images/show-images.component';
import {AddImagesComponent} from './add-images/add-images.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ShowImagesComponent, AddImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule
  ]
})
export class ImagesModule {
}
