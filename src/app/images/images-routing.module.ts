import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowImagesComponent} from './show-images/show-images.component';
import {StoryResolverService} from '../shared/resolvers/story-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowImagesComponent,
    resolve: {
      story: StoryResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule {
}
