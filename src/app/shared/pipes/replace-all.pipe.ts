import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'replaceAll'
})
export class ReplaceAllPipe implements PipeTransform {

  /**
   * Coverts name to underscored folders name or opposite
   * @param value
   * @param {boolean} folder2Name
   * @param {boolean} lowercase
   * @returns {any}
   */
  transform(value: any, folder2Name = true, lowercase = false): any {
    if (value) {

      if (folder2Name) return value.toString().replace(/_/g, ' ');
      else {
        if (lowercase) value = value.toLowerCase();
        return value.toString().replace(/ /g, '_');
      }
    }
    else return '';
  }

}
