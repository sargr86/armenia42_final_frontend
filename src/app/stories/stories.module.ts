import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoriesRoutingModule} from './stories-routing.module';
import {SharedModule} from '../shared/shared.module';

import {ShowStoriesComponent} from './show-stories/show-stories.component';
import {EditStoryComponent} from './edit-story/edit-story.component';

@NgModule({
  declarations: [ShowStoriesComponent, EditStoryComponent],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    SharedModule
  ]
})
export class StoriesModule {
}
