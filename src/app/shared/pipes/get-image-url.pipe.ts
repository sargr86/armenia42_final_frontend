import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ReplaceAllPipe} from './replace-all.pipe';
import {UPLOADS_FOLDER} from '../constants/settings';

@Pipe({
  name: 'getImgUrl'
})
export class GetImageUrlPipe implements PipeTransform {

  constructor(
    private sanitizer: DomSanitizer,
    private replace: ReplaceAllPipe
  ) {

  }

  /**
   * Returns sanitized image url
   * @param name file name
   * @param path folder path
   * @param  background is background or an image
   * @returns {any}
   */
  transform(name, path = '', background = false): any {
    let folder = '';
    let url;
    if (path) {
      folder = path;
    }
    if (!name) {
      return;
    }
    if (background) {
      url = 'url("' + UPLOADS_FOLDER + folder + '/' + name + '")';
      url = this.replace.transform(url, false);
      return this.sanitizer.bypassSecurityTrustStyle(url);
    } else {
      url = UPLOADS_FOLDER + folder + '/' + name;
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }

  }

}
