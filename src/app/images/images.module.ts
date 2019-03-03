import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagesRoutingModule } from './images-routing.module';
import { ShowImagesComponent } from './show-images/show-images.component';
import { AddImagesComponent } from './add-images/add-images.component';

@NgModule({
  declarations: [ShowImagesComponent, AddImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule
  ]
})
export class ImagesModule { }
