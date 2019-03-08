import {Injectable} from '@angular/core';
import {BREADCRUMB_PARTS, DEFAULT_ACTIONS} from '../constants/settings';
import {Breadcrumb} from '../models/Breadcrumb';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateBreadcrumbsService {

  breadCrumbs: Breadcrumb[] = [];
  result = [];
  url;

  constructor(
    private router: Router,
    private translate: TranslateService
  ) {
  }


  /**
   * Manages breadcrumbs building
   * @param data route data
   * @param url router url
   * @param lang current language
   */
  do(data, url, lang = 'en'): Breadcrumb[] {
    this.breadCrumbs = [];
    this.url = url;
    this.build(data, '', lang);
    return this.breadCrumbs;
  }

  /**
   * Build breadcrumbs
   * @param data route data
   * @param key route data appropriate key
   * @param lang current system language
   */
  build(data, key, lang) {

    // If key is passed, getting the next value
    if (key) {
      data = data[key];
    }

    if (data) {
      // Getting keys of passed data and filtering keys that don't have 'name' string in their name
      const keys = Object.keys(data).filter(k => {
        return BREADCRUMB_PARTS.includes(k);
      });

      // Saving the value of current recursion!!!
      if (data[`name_${lang}`]) {
        this.breadCrumbs.push({
          name: data['name_' + lang],
          link: data['name_en'].toLowerCase()
        });
      }

      // Checks to see if counter reached at the keys array end, if not start over
      if (keys.length > 0) {
        this.build(data, keys[0], lang);
      } else {
        this.breadCrumbs = this.breadCrumbs.reverse();

        // Adding one of the default actions to the breadcrumbs, if router url contains it
        DEFAULT_ACTIONS.map(action => {
          if (this.url.includes(action)) {
            this.breadCrumbs.push({
              name: this.translate.instant(action),
              link: action
            });
          }
        });

      }
    }


  }

}
