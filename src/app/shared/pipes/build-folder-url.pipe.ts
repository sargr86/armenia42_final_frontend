import {Pipe, PipeTransform} from '@angular/core';
import {DEFAULT_ACTIONS} from '../constants/settings';

@Pipe({
  name: 'buildFolderUrl'
})
export class BuildFolderUrlPipe implements PipeTransform {

  transform(routerUrl: any, pop = false): any {
    const splittedUrl = routerUrl.split('/');
    const urlArr = splittedUrl.filter(r => !DEFAULT_ACTIONS.includes(r));
    if (pop) {
      urlArr.pop();
    }
    const url = urlArr.join('/');
    return url;
  }

}
