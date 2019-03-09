import {Pipe, PipeTransform} from '@angular/core';
import {COVER_ITEMS} from '../constants/settings';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'buildCoverItems'
})
export class BuildCoverItemsPipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) {

  }

  transform(data: any, args?: any): any {
    const result = COVER_ITEMS;
    result.map(item => {
      item['value'] = data[`${item['label']}_id`];
      item['label'] = this.translate.instant(item['label']);
    });
    return result;

  }

}
