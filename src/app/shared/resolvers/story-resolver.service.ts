import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {ReplaceAllPipe} from '../pipes/replace-all.pipe';
import {GetLangPipe} from '../pipes/get-lang.pipe';
import {StoriesService} from '../services/stories.service';

@Injectable({
  providedIn: 'root'
})
export class StoryResolverService {

  constructor(
    private replace: ReplaceAllPipe,
    private getLang: GetLangPipe,
    private stories: StoriesService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const params = route.params;
    const story = params.story ? this.replace.transform(params.story) : '';
    return this.stories.getById({
      id: story,
      parent_name: params.location,
      lang: this.getLang.transform()
    });
  }
}
