import {Validators} from '@angular/forms';


export default class ItemFormFields {
  static get(edit: boolean, item: string) {
    const lang = localStorage.getItem('lang') || 'en';
    const formFields = {
      lang: lang,
      flag_img: '',
      folder: '',
      parent_name: ''
    };

    // Setting additional fields for register-user and edit-profile cases
    if (edit) {
      formFields['id'] = [''];
      formFields['new_folder'] = [''];
    }

    if (item === 'location') {
      formFields['category_ids'] = '';
    }

    formFields[`name_${lang}`] = ['', [Validators.required]];
    formFields[`description_${lang}`] = '';
    formFields['lang'] = lang;
    if (edit) {
      formFields['id'] = '';
      formFields['with_folder'] = '0';
    }

    return formFields;

  }
}
