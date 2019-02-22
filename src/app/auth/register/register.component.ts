import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";


import {dpFormats, dpProviders} from '../../shared/constants/datepicker-formats';
import {DateAdapter} from "@angular/material";
import * as moment from 'moment';

import * as fc from "../../shared/constants/form_config";
import {infoBox} from "../../shared/constants/info_box_data";

import * as dropzoneConfig from '../../shared/constants/dropzone';
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";

import {AuthService} from "../../shared/services/auth.service";

import {GetLangPipe} from "../../shared/pipes/get-lang.pipe";
import {GetUserRegistrationFieldsPipe} from "../../shared/pipes/get-user-registration-fields.pipe";
import {User} from "../../shared/models/User";
import {FixMatDatepickerDateFormatPipe} from "../../shared/pipes/fix-mat-datepicker-date-format.pipe";
import {SetMatDatepickerAdapterLocalePipe} from "../../shared/pipes/set-mat-datepicker-adapter-locale.pipe";
import {ActivatedRoute, Router} from "@angular/router";

import RegFields from "../../shared/helpers/get-user-registration-fields";
import {SaveUserInfoService} from "../../shared/services/save-user-info.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: dpProviders
})
export class RegisterComponent implements OnInit {

    lang: string = this.getLang.transform();
    formAction: string = this._router.url.includes('register') ? 'register' : 'update';
    infoBoxData: string[];
    editProfile: boolean = false;

    registerForm: FormGroup;
    userData: User;
    fieldsConfig;
    passHidden: boolean = true;

    dropzoneConfig: DropzoneConfigInterface;
    dropzoneFile: any = {};


    constructor(
        private _fb: FormBuilder,
        public _auth: AuthService,
        public _router: Router,
        private _route: ActivatedRoute,
        private getLang: GetLangPipe,
        private adapter: DateAdapter<any>,
        private getFormFields: GetUserRegistrationFieldsPipe,
        private fixDpFormat: FixMatDatepickerDateFormatPipe,
        private setAdapterLang: SetMatDatepickerAdapterLocalePipe,
        private _saveInfo: SaveUserInfoService
    ) {
        // Getting form fields and drop zone config
        this.fieldsConfig = fc;
        this.dropzoneConfig = dropzoneConfig.USER_PROFILE_IMG_DROPZONE_CONFIG;

        // Setting material date picker locale and current form language equal to last saved one
        this.lang = this.getLang.transform();
        this.setAdapterLang.transform(this.adapter, this.lang);
    }

    ngOnInit() {

        this.registerForm = this._fb.group(RegFields.get(this.formAction=='update'));

        // Getting info box elements for this page
        this.infoBoxData = this.editProfile ? infoBox.profileEdit : infoBox.userRegistration;

        // Setting all the received fields of the form
        this.setFormFields();
    }

    /**
     * Sets the register/profile edit form fields
     */
    setFormFields() {

        // Getting route data
        this._route.data.subscribe(dt => {
            this.userData = dt.user;
            if (this.userData) {
                this.editProfile = true;
            }

            // Building register form with the received fields
            this.registerForm = this._fb.group(this.getFormFields.transform(this.editProfile));

            // Setting fields values for edit-profile case
            if (this.editProfile) {
                this.registerForm.patchValue(dt.user)
            }
        });
    }


    /**
     * Sends user registration data to the auth service
     */
    register() {

        // Fixing birthday value date format to meet our needs
        this.fixDpFormat.transform(this.birthdayField);

        // Getting form data object built with the form values and drop zone file
        let formData: FormData = this.buildFormData();

        // if (this.registerForm.valid) {
            this._auth.formProcessing = true;
            this._auth[this.formAction](formData).subscribe(dt => {
                this._saveInfo.do(dt,this.editProfile);
            });
        // }


    }


    /**
     * Builds formData with form fields value and drop zone file
     * @returns {FormData}
     */
    buildFormData() {
        let formData: FormData = new FormData();
        let formValue = this.registerForm.value;
        let dropFileExist = Object.entries(this.dropzoneFile).length > 0;

        for (let field in this.registerForm.value) {
            if (field == 'birthday') {
                if (formValue['birthday']) {
                    formData.append(field, this.registerForm.value[field])
                }
            }
            else if (field!='profile_img'||!dropFileExist)
                formData.append(field, this.registerForm.value[field])
        }

        // If drop zone file exists saving it to formData object as well
        if (dropFileExist) {

            let file = this.dropzoneFile[0];

            let t = moment();
            let nameArr = file['name'].split('.');
            let fileName = `${nameArr[0]}${t}.${nameArr[1]}`;
            formData.append('profile_img', fileName);
            formData.append('profile_img_file', file, fileName)
        }

        return formData;
    }

    /**
     * Removes user profile image
     */
    removeImage() {
        this.userData.profile_img = '';
        this.dropzoneFile = {};
        this.registerForm.controls['profile_img'].patchValue('')
    }

    /**
     * Gets selected image file
     * @param e
     */
    onAddedFile(e) {
        this.dropzoneFile = e;
    }

    /**
     * Toggles password appearance
     */
    togglePass() {
        this.passHidden = !this.passHidden;
    }


    /**
     * First name field control getter
     * @returns {AbstractControl}
     */
    get firstName() {
        return this.registerForm.get(`first_name_${this.lang}`);
    }

    /**
     * Last name field control getter
     * @returns {AbstractControl}
     */
    get lastName(): AbstractControl {
        return this.registerForm.get(`last_name_${this.lang}`);
    }

    get birthdayField() {
        return this.registerForm.get('birthday');
    }

    /**
     * E-mail field getter
     * @returns {AbstractControl}
     */
    get email(): AbstractControl {
        return this.registerForm.get('email');
    }

    /**
     * Password field getter
     * @returns {AbstractControl}
     */
    get pass(): AbstractControl {
        return this.registerForm.get('password')
    }

    /**
     * Gets profile image name if exists
     * @returns {any}
     */
    get profileImg(): any {
        return this.userData ? this.userData.profile_img : false;
    }


}
