import {Pipe, PipeTransform} from '@angular/core';
import {COVER_ITEMS} from '../constants/settings';
import {GetLangPipe} from './get-lang.pipe';

@Pipe({
  name: 'buildCoverItems'
})
export class BuildCoverItemsPipe implements PipeTransform {

  constructor(
    private getLang: GetLangPipe,
  ) {

  }

  transform(data: any, args?: any): any {
    const dt = COVER_ITEMS;
    const lang = this.getLang.transform();
    const result = [];

    dt.map(item => {
      item['label'] = item['label_' + lang];
      item['value'] = data[`${item['label_en']}_id`];
      result.push({label: item['label'], value: item['value'], model: item['model']});
    });
    return result;

  }

}
