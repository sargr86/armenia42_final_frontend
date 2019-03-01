import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {ReplaceAllPipe} from './replace-all.pipe';

@Pipe({
  name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

  constructor(private replace: ReplaceAllPipe) {

  }

  transform(formValue: any, dropzoneFile: any, lang: string): any {

    const formData: FormData = new FormData();
    const dropFileExist: boolean = Object.entries(dropzoneFile).length > 0;

    for (const field of Object.keys(formValue)) {
      if (field === 'new_folder' && lang === 'en') {
        const newFolder = formValue['folder'].substring(0, formValue['folder'].lastIndexOf('/')) + '/' + formValue['name_en'];
        formValue[field] = this.replace.transform(newFolder, false, true);
      }

      if (field !== 'flag_img' || !dropFileExist) {
        formData.append(field, formValue[field]);
      }
    }

    // If drop zone file exists saving it to formData object as well
    if (dropFileExist) {

      const file = dropzoneFile[0];
      const t = moment();
      const nameArr = file['name'].split('.');
      const fileName = `${nameArr[0]}.${nameArr[1]}`;
      formData.append('flag_img', fileName);
      formData.append('flag_file', file, fileName);
    }


    return formData;
  }

}
