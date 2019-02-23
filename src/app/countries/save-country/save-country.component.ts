import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {GetLangPipe} from "../../shared/pipes/get-lang.pipe";
import CountryFormFields from "../../shared/helpers/get-country-form-fields";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {DropzoneConfigInterface} from "ngx-dropzone-wrapper";
import {infoBox} from "../../shared/constants/info_box_data";
import {CountriesService} from "../../shared/services/countries.service";
import {AuthService} from "../../shared/services/auth.service";
import {TEXTAREA_AUTOSIZE_MIN_ROWS, TEXTAREA_AUTOSIZE_MAX_ROWS} from "../../shared/constants/settings";
import {TextAreaLimits} from "../../shared/models/TextAreaLimits";
import * as _ from 'lodash';
import * as dropzoneConfig from "../../shared/constants/dropzone";
import * as moment from 'moment';

@Component({
    selector: 'app-save-country',
    templateUrl: './save-country.component.html',
    styleUrls: ['./save-country.component.scss']
})
export class SaveCountryComponent implements OnInit {

    countryForm: FormGroup;
    lang: string = this.getLang.transform();

    routeData: Data;
    editCase: boolean = this.router.url.includes('edit');
    saveAction: string = this.editCase ? 'update' : 'add';

    pageTitle: string;
    infoBoxData: string[];
    textAreaLimits: TextAreaLimits = {min: TEXTAREA_AUTOSIZE_MIN_ROWS, max: TEXTAREA_AUTOSIZE_MAX_ROWS};
    imageExists: boolean; // checks to see if defined flag image of current country exist

    dropzoneFile: object = {};
    dropzoneConfig: DropzoneConfigInterface;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private _fb: FormBuilder,
        private _auth: AuthService,
        private getLang: GetLangPipe,
        private _countries: CountriesService,
    ) {
    }

    ngOnInit() {

        this.dropzoneConfig = dropzoneConfig.USER_PROFILE_IMG_DROPZONE_CONFIG;

        // Getting info box data
        this.infoBoxData = infoBox.countryAdding;

        this.route.data.subscribe((dt: Data) => {
            this.pageTitle = dt['title'];
            this.routeData = dt;
            this.getFormFields(this.lang, dt);
        });


    }


    /**
     * Builds the form with received fields and data
     * @param {string} lang
     * @param {Data} data
     */
    getFormFields(lang: string, data: Data) {
        let fields: any = CountryFormFields.get(this.saveAction == 'update');
        this.countryForm = this._fb.group(fields);
        if (data.hasOwnProperty('country')) {
            this.countryForm.patchValue(data.country)
        }
    }

    /**
     * Gets selected image file
     * @param e
     */
    onAddedFile(e) {
        this.dropzoneFile = e;
    }

    /**
     * If flag image is selected, saving its name in the registration field and formData
     */
    setFileData() {
        let formData = new FormData();

        // If drop zone file exists saving it to formData object as well
        if (Object.entries(this.dropzoneFile).length != 0) {
            let file = this.dropzoneFile[0];
            formData.append('file', file);
            formData.append('flag', file['name']);
            this.countryForm.controls['flag'].patchValue(file['name'])
        }
        return formData;
    }

    /**
     * Adds or updates country info
     */
    save() {

        // Getting form data object built with the form values and drop zone file
        let formData: FormData = this.buildFormData();

        this._auth.formProcessing = true;

        // if(this.countryForm.valid){

        // Adding or updating a country info
        this._countries[this.saveAction](formData).subscribe(() => {
            this._auth.formProcessing = false;
            this.router.navigate(['world/countries'])
        })
    }

    /**
     * Builds form data to send to the server
     * @returns {FormData}
     */
    buildFormData() {
        let formData: FormData = new FormData();
        let dropFileExist = Object.entries(this.dropzoneFile).length > 0;

        console.log( Object.entries(this.dropzoneFile).length)

        for (let field in this.countryForm.value) {

            if (field != 'flag' || !dropFileExist)
                formData.append(field, this.countryForm.value[field])
        }



        // If drop zone file exists saving it to formData object as well
        if (dropFileExist) {

            let file = this.dropzoneFile[0];

            let t = moment();
            let nameArr = file['name'].split('.');
            let fileName = `${nameArr[0]}${t}.${nameArr[1]}`;
            formData.append('flag', fileName);
            formData.append('flag_file', file, fileName)
        }

        return formData;
    }



    /**
     * Removes country info
     */
    remove() {
        this._countries.remove({lang: this.lang, id: this.countryForm.value['id']}).subscribe(() => {
            this.router.navigate(['world/countries'])
        });
    }

    /**
     * Removes current flag image from the drop zone
     */
    removeImage() {
        console.log('here')
        this.dropzoneFile = {};
        this.countryForm.controls['flag'].patchValue('')
    }

    /**
     * Gets country data passed by route url
     * @returns {any}
     */
    get routeCountry() {
        return _.get(this.routeData, 'country');
    }

    /**
     * Gets flag name
     * @returns {string|undefined}
     */
    get flag() {
        return _.get(this.routeCountry, 'flag_img')
    }

    /**
     * Gets folder url for flag
     * @returns {string}
     */
    get folderUrl() {
        return `others/${_.get(this.routeCountry, 'name_en')}/`;
    }

}
