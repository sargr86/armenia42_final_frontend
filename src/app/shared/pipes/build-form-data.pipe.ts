import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {ReplaceAllPipe} from './replace-all.pipe';
import {AuthService} from '../services/auth.service';

@Pipe({
  name: 'buildFormData'
})
export class BuildFormDataPipe implements PipeTransform {

  constructor(
    private replace: ReplaceAllPipe,
    private _auth: AuthService
  ) {

  }

  transform(formValue: any, dropzoneFiles: any, item: string, lang: string): any {

    const formData: FormData = new FormData();
    const dropFileExist: boolean = dropzoneFiles.length > 0;


    for (const field of Object.keys(formValue)) {

      // Fixing null values applying as 'null' when patching form value
      if (formValue[field] == null) {
        formValue[field] = '';
      }

      // Getting new folder generated by user input in new-*item name field for  update case, necessary for folder renaming
      // only for English version of the system
      if (field === 'new_folder' && lang === 'en') {
        const newFolder = formValue['folder'].substring(0, formValue['folder'].lastIndexOf('/')) + '/' + formValue['name_en'];
        formValue[field] = this.replace.transform(newFolder, false, true);
      }

      // Implemented categories field logic here
      if (field === 'category_ids' && formValue['category_ids']) {
        const ids = [];
        formValue['category_ids'].map(cat => {
          ids.push(cat['value']);
        });
        formData.append(field, ids.join(','));

        // Appending flag image field to form data if drop zone file is not exist
      } else if (field !== 'flag_img' || !dropFileExist) {
        formData.append(field, formValue[field]);
      }
    }

    if (item === 'story' || item === 'location') {
      formData.append('user_id', this._auth.userData.id.toString());
      formData.append('email', this._auth.userData.email);
    }

    // If drop zone file exists saving it to formData object as well
    if (dropFileExist) {

      // On story page adding user as well
      if (item === 'story') {

        dropzoneFiles.map(f => {
          const file = f[0];
          const t = moment();
          const nameArr = file['name'].split('.');
          const fileName = `${nameArr[0]}.${nameArr[1]}`;

          formData.append('story_imgs', fileName);
          formData.append('story_img_files', file, fileName);
        });


      } else {
        const file = dropzoneFiles[0];
        const t = moment();
        const nameArr = file[0]['name'].split('.');
        const fileName = `${nameArr[0]}.${nameArr[1]}`;

        formData.append('flag_img', fileName);
        formData.append('flag_file', file[0], fileName);
      }

    }


    return formData;
  }

}
