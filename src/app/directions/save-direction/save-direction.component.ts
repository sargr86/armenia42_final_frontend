import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import ItemFormFields from '../../shared/helpers/get-item-form-fields';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
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
import {ReplaceAllPipe} from '../../shared/pipes/replace-all.pipe';
import FormInfoBoxData from '../../shared/helpers/get-info-box-data-for-forms';
import {DirectionsService} from '../../shared/services/directions.service';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';
import {RedirectToListService} from '../../shared/services/redirect-to-list.service';

@Component({
  selector: 'app-save-direction',
  templateUrl: './save-direction.component.html',
  styleUrls: ['./save-direction.component.scss']
})
export class SaveDirectionComponent implements OnInit {

  directionForm: FormGroup;
  lang: string = this.getLang.transform();

  routeData: Data;
  editCase: boolean = this.router.url.includes('edit');
  saveAction: string = this.editCase ? 'update' : 'add';

  pageTitle: string;
  infoBoxData: string[];
  textAreaLimits: TextAreaLimits = {min: TEXTAREA_AUTOSIZE_MIN_ROWS, max: TEXTAREA_AUTOSIZE_MAX_ROWS};
  imageExists = true; // checks to see if defined flag image of current direction exist

  dropzoneFile: object = {};
  dropzoneConfig: DropzoneConfigInterface;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private getLang: GetLangPipe,
    private _directions: DirectionsService,
    private dialog: MatDialog,
    private buildFolderUrl: BuildFolderUrlPipe,
    private translate: TranslateService,
    private toastr: ToastrService,
    private replace: ReplaceAllPipe,
    private buildFormData: BuildFormDataPipe,
    private redirect: RedirectToListService
  ) {
  }

  ngOnInit() {

    // Getting drop zone configuration and stopping spinner
    this.dropzoneConfig = dropzoneConfig.USER_PROFILE_IMG_DROPZONE_CONFIG;
    this._auth.formProcessing = false;

    // Getting data for info box for different language cases
    this.infoBoxData = FormInfoBoxData.get(this.editCase, this.lang);

    // Getting data passed by route
    this.getRouteData();
  }

  /**
   * Gets data passed by route
   */
  getRouteData() {
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
    // Setting the form fields both for edit and add cases
    this.directionForm = this._fb.group(ItemFormFields.get(this.saveAction === 'update') as any);

    // Applying province or direction folder for add* or edit-direction cases
    this.directionForm.patchValue(this.editCase ? data.direction : {
      folder: data['province']['folder'],
      parent_name: data['province']['name_en']
    });

  }

  /**
   * Adds or updates direction info
   */
  save() {

    // Building form data object and getting it
    const formData = this.buildFormData.transform(this.directionForm.value, this.dropzoneFile, this.lang);

    if (this.directionForm.valid) {

      // Showing the button spinner
      this._auth.formProcessing = true;

      // Adding or updating a direction info
      this._directions[this.saveAction](formData).subscribe(() => {
        this.redirect.do(this.saveAction, 'direction');
      });
    }
  }

  /**
   * Removes a direction info
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
            folder: this.routeDirection['folder'],
            lang: this.lang,
            id: this.directionForm.value['id']
          };

          this._directions.remove(params).subscribe(() => {
            this.redirect.do('remove', 'direction');
          });
        }
      }
    );


  }

  /**
   * Removes current flag image from the drop zone
   */
  removeImage() {
    if (this.editCase) {
      this.routeDirection.flag_img = '';
    }
    this.dropzoneFile = {};
    this.directionForm.controls['flag_img'].patchValue('');
  }

  /**
   * Gets selected image file
   * @param e drop zone-added-file event
   */
  onAddedFile(e) {
    this.dropzoneFile = e;
  }

  /**
   * Changing remove-with-folder  checkbox state
   * @param e checkbox change event
   */
  changeWithFolderState(e: any) {
    this.withFolder.patchValue(e.target.checked ? '1' : '0');
  }


  /**
   * Gets direction data passed by route url
   * @returns route data direction
   */
  get routeDirection(): any {
    return _.get(this.routeData, 'direction');
  }

  /**
   * Gets flag name
   * @returns flag image file name
   */
  get flag(): string | undefined {
    return _.get(this.routeDirection, 'flag_img');
  }

  /**
   * Gets folder url for flag
   * @returns folder url of the direction
   */
  get folderUrl(): string {
    return `others/${this.routeData.direction.folder}`;
  }

  /**
   * Get with folder checkbox control
   * @returns with folder checkbox control
   */
  get withFolder(): AbstractControl | null {
    return this.directionForm.get('with_folder');
  }

  /**
   * Gets direction name control for checking the field errors
   * @returns direction name control
   */
  get directionName(): AbstractControl | null {
    return this.directionForm.get(`name_${this.lang}`);
  }
}
