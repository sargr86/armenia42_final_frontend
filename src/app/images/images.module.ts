import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ImagesRoutingModule} from './images-routing.module';
import {ShowImagesComponent} from './show-images/show-images.component';
import {AddImagesComponent} from './add-images/add-images.component';
import {SharedModule} from '../shared/shared.module';
import { EditImageInfoComponent } from './edit-image-info/edit-image-info.component';

@NgModule({
  declarations: [ShowImagesComponent, AddImagesComponent, EditImageInfoComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule
  ]
})
export class ImagesModule {
}
