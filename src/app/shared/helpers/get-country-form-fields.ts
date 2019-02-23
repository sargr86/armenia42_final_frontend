import {Validators} from "@angular/forms";


export default class CountryFormFields {
    static get(edit: boolean) {
        let lang = localStorage.getItem('lang')||'en';
        let formFields = {
            lang: lang,
            flag_img: '',
            folder:'',
            with_folder:'0'
        };

        // Setting additional fields for register-user and edit-profile cases
        if (edit) formFields['id'] = [''];

        formFields[`name_${lang}`] = ['', [Validators.required]];
        formFields[`description_${lang}`] = '';
        formFields['lang'] = lang;
        if(edit) formFields['id'] = '';

        return formFields;

    }

}