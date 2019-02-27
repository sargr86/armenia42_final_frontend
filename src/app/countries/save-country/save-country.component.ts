import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import ItemFormFields from '../../shared/helpers/get-item-form-fields';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {CountriesService} from '../../shared/services/countries.service';
import {AuthService} from '../../shared/services/auth.service';
import {TEXTAREA_AUTOSIZE_MIN_ROWS, TEXTAREA_AUTOSIZE_MAX_ROWS} from '../../shared/constants/settings';
import {TextAreaLimits} from '../../shared/models/TextAreaLimits';
import * as _ from 'lodash';
import * as dropzoneConfig from '../../shared/constants/dropzone';
import * as moment from 'moment';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {BuildFolderUrlPipe} from '../../shared/pipes/build-folder-url.pipe';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import FormInfoBoxData from '../../shared/helpers/get-info-box-data-for-forms';

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
  imageExists = true; // checks to see if defined flag image of current country exist

  dropzoneFile: object = {};
  dropzoneConfig: DropzoneConfigInterface;

  folderPath: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private getLang: GetLangPipe,
    private _countries: CountriesService,
    private dialog: MatDialog,
    private buildFolderUrl: BuildFolderUrlPipe,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {

    this.dropzoneConfig = dropzoneConfig.USER_PROFILE_IMG_DROPZONE_CONFIG;
    this._auth.formProcessing = false;

    // Getting data for info box for different language cases
    this.infoBoxData = FormInfoBoxData.get(this.editCase, this.lang);

    this.route.data.subscribe((dt: Data) => {
      this.pageTitle = dt['title'];
      this.routeData = dt;
      this.buildFormFields(this.lang, dt);
    });


  }


  /**
   * Builds the form with received fields and data
   * @param  lang system current language
   * @param  data router data
   */
  buildFormFields(lang: string, data: Data) {

    // Sets the fields of country form
    this.countryForm = this._fb.group(ItemFormFields.get(this.saveAction === 'update') as any);

    // Getting folder path from route data
    if (data.hasOwnProperty('country')) {
      const countryData = data.country;
      for (const key of Object.keys(countryData)) {
        if (countryData[key] == null) {
          countryData[key] = '';
        }
        this.folderPath = this.buildFolderUrl.transform(this.router.url);
        countryData['folder'] = this.folderPath;
      }
      this.countryForm.patchValue(countryData);
    }
  }

  /**
   * Gets selected image file
   * @param e drop zone-added-file event
   */
  onAddedFile(e) {
    this.dropzoneFile = e;
  }

  /**
   * Adds or updates country info
   */
  save() {

    // Getting form data object built with the form values and drop zone file
    const formData: FormData = this.buildFormData();

    if (this.countryForm.valid) {

      // Showing the button spinner
      this._auth.formProcessing = true;

      // Adding or updating a country info
      this._countries[this.saveAction](formData).subscribe(() => {
        this.redirectToList(this.saveAction);
      });
    }
  }

  /**
   * Builds form data to send to the server
   * @returns form Data object
   */
  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const dropFileExist = Object.entries(this.dropzoneFile).length > 0;
    let formValue;

    for (const field of Object.keys(this.countryForm.value)) {
      formValue = this.countryForm.value[field];
      if (field !== 'flag_img' || !dropFileExist) {
        formData.append(field, formValue);
      }
    }


    // If drop zone file exists saving it to formData object as well
    if (dropFileExist) {

      const file = this.dropzoneFile[0];
      const t = moment();
      const nameArr = file['name'].split('.');
      const fileName = `${nameArr[0]}.${nameArr[1]}`;
      formData.append('flag_img', fileName);
      formData.append('flag_file', file, fileName);
    }

    return formData;
  }


  /**
   * Removes a country info
   */
  remove() {

    // Setting dialog properties
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      width: '300px'
    });

    // Post-confirming actions
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          // Showing spinner
          this._auth.removeLoading = true;

          // Setting parameters to send
          const params = {with_folder: this.withFolder.value, lang: this.lang, id: this.countryForm.value['id']};

          this._countries.remove(params).subscribe(() => {
            this.redirectToList('remove');
          });
        }
      }
    );


  }

  /**
   * Redirects to countries list page
   */
  redirectToList(action) {
    this._auth.removeLoading = false;
    this._auth.formProcessing = false;
    this.router.navigate(['world/countries']);
    const msg = `country_${action}_success`;
    this.translate.get([msg]).subscribe(dt => {
      this.toastr.success('', dt[msg]);
    });
  }

  /**
   * Removes current flag image from the drop zone
   */
  removeImage() {
    if (this.editCase) {
      this.routeCountry.flag_img = '';
    }
    this.dropzoneFile = {};
    this.countryForm.controls['flag_img'].patchValue('');
  }

  /**
   * Changing remove-with-folder  checkbox state
   * @param e checkbox change event
   */
  changeWithFolderState(e: any) {
    this.withFolder.patchValue(e.target.checked ? '1' : '0');
  }

  /**
   * Gets country data passed by route url
   * @returns route data country
   */
  get routeCountry(): any {
    return _.get(this.routeData, 'country');
  }

  /**
   * Gets flag name
   * @returns flag image file name
   */
  get flag(): string | undefined {
    return _.get(this.routeCountry, 'flag_img');
  }

  /**
   * Gets folder url for flag
   * @returns folder url of the country
   */
  get folderUrl(): string {
    return `others/${_.get(this.routeCountry, 'name_en')}/`;
  }

  /**
   * Get with folder checkbox control
   * @returns with folder checkbox control
   */
  get withFolder(): AbstractControl | null {
    return this.countryForm.get('with_folder');
  }

  /**
   * Gets country name control for checking the field errors
   * @returns country name control
   */
  get countryName(): AbstractControl | null {
    return this.countryForm.get(`name_${this.lang}`);
  }

}
