import {Pipe, PipeTransform} from '@angular/core';
import {ReplaceAllPipe} from "./replace-all.pipe";
import {DEFAULT_COUNTRY, DEFAULT_ITEMS} from "../constants/settings";

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
    let splitterUrl = routerUrl.split('/').filter(n => n);

    // Home page case (when url is '/')
    if (splitterUrl.length === 0) {
      splitterUrl = [this.replace.transform(DEFAULT_COUNTRY, false, true)];
    }

    // Checking if router url contains default items values and cleaning if so
    const cleaned = splitterUrl.filter(r => !DEFAULT_ITEMS.includes(r)).join('/');

    // Getting name or id of child element
    item = storiesPage ? item['id'] : item['name_en'];

    if (!storiesPage) {
      item = this.replace.transform(item, false, true);
    }

    // Generating and returning final url
    return `${cleaned}/${item}`;
  }

}
