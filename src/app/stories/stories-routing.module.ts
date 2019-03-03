import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShowStoriesComponent} from './show-stories/show-stories.component';
import {EditStoryComponent} from './edit-story/edit-story.component';
import {LocationResolverService} from '../shared/resolvers/location-resolver.service';
import {StoryResolverService} from '../shared/resolvers/story-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: ShowStoriesComponent,
    data: {}
  },
  {
    path: 'add',
    component: EditStoryComponent,
    resolve: {
      location: LocationResolverService
    },
    data: {
      title: 'story_terminal',
      item: 'stories',
      icon: 'book-open'
    }
  },
  {
    path: ':story/edit',
    component: EditStoryComponent,
    resolve: {
      story: StoryResolverService
    },
    data: {
      title: 'story_terminal',
      item: 'stories',
      icon: 'book-open'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesRoutingModule {
}
