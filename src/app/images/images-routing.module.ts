import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowImagesComponent} from './show-images/show-images.component';
import {StoryResolverService} from '../shared/resolvers/story-resolver.service';
import {AddImagesComponent} from './add-images/add-images.component';
import {EditImageInfoComponent} from './edit-image-info/edit-image-info.component';
import {ImageResolver} from '../shared/resolvers/image-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowImagesComponent,
    resolve: {
      story: StoryResolverService
    },
    data: {
      title: 'story_images',
      parent: 'story'
    }
  },
  {
    path: 'add',
    component: AddImagesComponent,
    resolve: {
      story: StoryResolverService
    }
  },
  {
    path: 'image/:image_id',
    component: EditImageInfoComponent,
    resolve: {
      image: ImageResolver
    },
    data: {
      title: 'images_terminal'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule {
}
