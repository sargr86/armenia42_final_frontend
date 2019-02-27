import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import ItemFormFields from '../../shared/helpers/get-item-form-fields';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import {infoBox} from '../../shared/constants/info_box_data';
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
import {ProvincesService} from '../../shared/services/provinces.service';
import {ReplaceAllPipe} from '../../shared/pipes/replace-all.pipe';

@Component({
  selector: 'app-save-province',
  templateUrl: './save-province.component.html',
  styleUrls: ['./save-province.component.scss']
})
export class SaveProvinceComponent implements OnInit {

  provinceForm: FormGroup;
  lang: string = this.getLang.transform();

  routeData: Data;
  editCase: boolean = this.router.url.includes('edit');
  saveAction: string = this.editCase ? 'update' : 'add';

  pageTitle: string;
  infoBoxData: string[];
  textAreaLimits: TextAreaLimits = {min: TEXTAREA_AUTOSIZE_MIN_ROWS, max: TEXTAREA_AUTOSIZE_MAX_ROWS};
  imageExists = true; // checks to see if defined flag image of current province exist

  dropzoneFile: object = {};
  dropzoneConfig: DropzoneConfigInterface;

  folderPath: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private getLang: GetLangPipe,
    private _provinces: ProvincesService,
    private dialog: MatDialog,
    private buildFolderUrl: BuildFolderUrlPipe,
    private translate: TranslateService,
    private toastr: ToastrService,
    private replace: ReplaceAllPipe
  ) {
  }

  ngOnInit() {

    // Getting drop zone configuration and stopping spinner
    this.dropzoneConfig = dropzoneConfig.USER_PROFILE_IMG_DROPZONE_CONFIG;
    this._auth.formProcessing = false;

    // Getting data for info box
    this.getInfoBoxData();

    // Getting data passed by route
    this.getRouteData();
  }

  /**
   * Gets info box data for different languages
   */
  getInfoBoxData() {
    // Getting info box data, removing first item, because it relates only to English version of the system
    this.infoBoxData = infoBox[this.editCase ? 'itemEditing' : 'itemAdding'];
    if (this.lang !== 'en' && this.editCase) {
      this.infoBoxData = this.infoBoxData.filter(n => n !== 'item_name_affects_folder_name');
    }
  }

  /**
   * Gets data passed by route
   */
  getRouteData() {
    this.route.data.subscribe((dt: Data) => {
      this.pageTitle = dt['title'];
      this.routeData = dt;
      this.getFormFields(this.lang, dt);
    });
  }


  /**
   * Builds the form with received fields and data
   * @param  lang system current language
   * @param  data router data
   */
  getFormFields(lang: string, data: Data) {

    // Setting the form fields
    const fields: any = ItemFormFields.get(this.saveAction === 'update');
    this.provinceForm = this._fb.group(fields);

    // Getting parent folder path in add case and parent+province path in edit case
    this.folderPath = this.buildFolderUrl.transform(this.router.url);

    // Setting province data values for edit case
    if (data.hasOwnProperty('province')) {
      const provinceData = data.province;
      for (const key of Object.keys(provinceData)) {
        if (provinceData[key] == null) {
          provinceData[key] = '';
        }

        provinceData['folder'] = this.folderPath;
        provinceData['parent_name'] = provinceData['country']['name_en'];
      }
      this.provinceForm.patchValue(provinceData);
    } else {
      this.provinceForm.patchValue({folder: this.folderPath});
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
   * Builds form data to send to the server
   * @returns form Data object
   */
  buildFormData(): FormData {
    const formData: FormData = new FormData();
    const dropFileExist = Object.entries(this.dropzoneFile).length > 0;
    let formValue;

    for (const field of Object.keys(this.provinceForm.value)) {
      const val = this.provinceForm.value;
      if (field === 'new_folder' && this.lang === 'en') {
        formValue = this.replace.transform(`/${val['parent_name']}/${val['name_en']}`, false, true);
      } else {
        formValue = val[field];
      }
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
   * Adds or updates province info
   */
  save() {

    // Getting form data object built with the form values and drop zone file
    const formData: FormData = this.buildFormData();

    if (this.provinceForm.valid) {

      // Showing the button spinner
      this._auth.formProcessing = true;

      // Adding or updating a province info
      this._provinces[this.saveAction](formData).subscribe(() => {
        this.redirectToList(this.saveAction);
      });
    }
  }


  /**
   * Removes a province info
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
          const params = {
            with_folder: this.withFolder.value,
            folder: this.folderPath,
            lang: this.lang,
            id: this.provinceForm.value['id']
          };

          this._provinces.remove(params).subscribe(() => {
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
    const url = this.router.url.split('/').filter(n => n)[0];
    this.router.navigate([url]);
    const msg = `province_${action}_success`;
    this.translate.get([msg]).subscribe(dt => {
      this.toastr.success('', dt[msg]);
    });
  }

  /**
   * Removes current flag image from the drop zone
   */
  removeImage() {
    if (this.editCase) {
      this.routeProvince.flag_img = '';
    }
    this.dropzoneFile = {};
    this.provinceForm.controls['flag_img'].patchValue('');
  }

  /**
   * Changing remove-with-folder  checkbox state
   * @param e checkbox change event
   */
  changeWithFolderState(e: any) {
    this.withFolder.patchValue(e.target.checked ? '1' : '0');
  }

  /**
   * Gets province data passed by route url
   * @returns route data province
   */
  get routeProvince(): any {
    return _.get(this.routeData, 'province');
  }

  /**
   * Gets flag name
   * @returns flag image file name
   */
  get flag(): string | undefined {
    return _.get(this.routeProvince, 'flag_img');
  }

  /**
   * Gets folder url for flag
   * @returns folder url of the province
   */
  get folderUrl(): string {
    return `others/${this.folderPath}`;
  }

  /**
   * Get with folder checkbox control
   * @returns with folder checkbox control
   */
  get withFolder(): AbstractControl | null {
    return this.provinceForm.get('with_folder');
  }

  /**
   * Gets province name control for checking the field errors
   * @returns province name control
   */
  get provinceName(): AbstractControl | null {
    return this.provinceForm.get(`name_${this.lang}`);
  }

}
