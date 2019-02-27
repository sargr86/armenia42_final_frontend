import {Pipe, PipeTransform} from '@angular/core';
import {ReplaceAllPipe} from "./replace-all.pipe";
import {DEFAULT_ITEMS} from "../constants/settings";

@Pipe({
  name: 'getChildUrl'
})
export class GenerateChildItemUrlPipe implements PipeTransform {

  constructor(
    private  replace: ReplaceAllPipe
  ) {

  }

  transform(item: any, storiesPage: boolean, routerUrl: string): any {

    // Getting router url filtered parts
    const splitterUrl = routerUrl.split('/').filter(n => n);

    // Checking if router url contains default items values and cleaning if so
    const cleaned = splitterUrl.filter(r => !DEFAULT_ITEMS.includes(r)).join('/');

    // Getting name or id of child element
    item = this.replace.transform(storiesPage ? item['id'] : item['name_en'], false, !storiesPage);

    // Generating and returning final url
    return `${cleaned}/${item}`;
  }

}
