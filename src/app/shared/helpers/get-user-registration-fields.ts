import {MAX_FIRST_NAME_LEN, MAX_LAST_NAME_LEN, MIN_FIRST_NAME_LEN, MIN_LAST_NAME_LEN} from '../constants/form_config';
import {FormControl, Validators} from '@angular/forms';
import {patternValidator} from './pattern-validator';

export default class RegFields {
  static get(edit: boolean) {
    const formFields = {
      birthday: [''],
      gender: ['male'],
      email: new FormControl('',
        {
          validators: [Validators.required, patternValidator()], updateOn: 'blur'
        }),
      profile_img: '',
    };

    // Setting additional fields for register-user and edit-profile cases
    if (!edit) {
      formFields['password'] = ['', [Validators.required]];
    } else {
      formFields['id'] = [''];
    }


    const lang = localStorage.getItem('lang') || 'en';
    formFields[`first_name_${lang}`] = ['', [Validators.required, Validators.minLength(MIN_FIRST_NAME_LEN),
      Validators.maxLength(MAX_FIRST_NAME_LEN)]];
    formFields[`last_name_${lang}`] = ['', [Validators.required, Validators.minLength(MIN_LAST_NAME_LEN),
      Validators.maxLength(MAX_LAST_NAME_LEN)]];
    formFields['lang'] = lang;
    return formFields;
  }
}
