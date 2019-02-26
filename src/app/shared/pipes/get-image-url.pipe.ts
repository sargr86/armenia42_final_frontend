import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ReplaceAllPipe} from "./replace-all.pipe";
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'getImgUrl'
})
export class GetImageUrlPipe implements PipeTransform {
  domain: string = environment.apiHost;

  constructor(
    private sanitizer: DomSanitizer,
    private replace: ReplaceAllPipe
  ) {

  }

  /**
   * Returns sanitized image url
   * @param name
   * @param {string} path
   * @param {boolean} background
   * @returns {any}
   */
  transform(name, path = '', background = false): any {
    let folder = '';
    if (path) folder = path;
    if (!name || !path) return;
    if (background) {
      let url = 'url("' + this.domain + 'uploads/' + folder + '/' + name + '")';
      url = this.replace.transform(url, false);
      return this.sanitizer.bypassSecurityTrustStyle(url);
    }
    else {
      let url = this.domain + 'uploads/' + folder + name;
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

  }

}
