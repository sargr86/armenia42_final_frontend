import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';

// Pipes
import {GetLangPipe} from '../../pipes/get-lang.pipe';

// Services
import {AuthService} from '../../services/auth.service';
import {CountriesService} from '../../services/countries.service';
import {ProvincesService} from '../../services/provinces.service';
import {DirectionsService} from '../../services/directions.service';
import {LocationsService} from '../../services/locations.service';
import {StoriesService} from '../../services/stories.service';

// The form fields
import ItemFormFields from '../../helpers/get-item-form-fields';

// Drop zone configuration
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import * as dropZoneConfig from '../../constants/dropzone';

// Text area limits
import {TEXTAREA_AUTOSIZE_MAX_ROWS, TEXTAREA_AUTOSIZE_MIN_ROWS} from '../../constants/settings';
import {TextAreaLimits} from '../../models/TextAreaLimits';

// Info box data
import FormInfoBoxData from '../../helpers/get-info-box-data-for-forms';
import {BuildFormDataPipe} from '../../pipes/build-form-data.pipe';
import {RedirectToListService} from '../../services/redirect-to-list.service';

// Lodash
import * as _ from 'lodash';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import {CategoriesService} from '../../services/categories.service';


@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {


  @Input() parent: string;
  @Input() item: string;

  itemForm: FormGroup;
  lang: string = this.getLang.transform();

  routeData: Data;
  routeItem: string;
  editCase: boolean = this.router.url.includes('edit');
  saveAction: string = this.editCase ? 'update' : 'add';

  pageTitle: string;
  infoBoxData: string[];
  textAreaLimits: TextAreaLimits = {min: TEXTAREA_AUTOSIZE_MIN_ROWS, max: TEXTAREA_AUTOSIZE_MAX_ROWS};
  imageExists = true; // checks to see if defined flag image of current direction exist

  dropzoneFiles = [];
  dropzoneConfig: DropzoneConfigInterface;

  categoriesList: any;

  constructor(
    private getLang: GetLangPipe,
    public router: Router,
    private route: ActivatedRoute,
    public _auth: AuthService,
    private _fb: FormBuilder,
    private buildFormData: BuildFormDataPipe,
    private _countries: CountriesService,
    private _provinces: ProvincesService,
    private _directions: DirectionsService,
    private _locations: LocationsService,
    private _stories: StoriesService,
    private _categories: CategoriesService,
    private redirect: RedirectToListService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {

    // Setting drop zone configuration and stopping 'save-action' loader
    this.dropzoneConfig = dropZoneConfig[(this.item !== 'story' ? 'ITEM_IMG_DROPZONE_CONFIG' : 'STORY_IMG_DROPZONE_CONFIG')];
    this._auth.formProcessing = false;

    // Getting data for info box for different language cases
    this.infoBoxData = FormInfoBoxData.get(this.editCase, this.lang, this.item);

    // Getting data passed by route
    this.getRouteData();

    if (this.item === 'location') {
      // Setting parameters to send
      const params = {
        lang: this.lang,
      };

      this.categoriesList = this._categories.getCategories(params, false);
    }

  }

  /**
   * Gets data passed by route
   */
  getRouteData() {
    this.route.data.subscribe((dt: Data) => {
      this.pageTitle = dt['title'];
      this.routeData = dt;
      this.routeItem = dt['item'];
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
    this.itemForm = this._fb.group(ItemFormFields.get(this.saveAction === 'update', this.item) as any);

    let childData;
    let parentData;

    // Non-country case
    if (this.parent) {

      // Edit-item case
      if (this.editCase) {
        childData = data[this.item];
        parentData = childData[this.parent];
        childData['parent_name'] = parentData['name_en'];
        childData['category_ids'] = childData['loc_categories'];
        // Add-item case
      } else {
        parentData = data[this.parent];
      }

      // Country case
    } else {
      childData = data[this.item];
    }

    // Applying province or direction folder for add* or edit-direction cases
    this.itemForm.patchValue(this.editCase ? childData : {
      folder: this.parent ? parentData['folder'] : '',
      parent_name: this.parent ? parentData['name_en'] : ''
    });

  }

  /**
   * Adds or updates direction info
   */
  save() {

    // Building form data object and getting it
    const formData = this.buildFormData.transform(this.itemForm.value, this.dropzoneFiles, this.item, this.lang);

    if (this.itemForm.valid) {

      // Showing the button spinner
      this._auth.formProcessing = true;

      // Adding or updating a direction info
      this[`_${this.routeItem}`][this.saveAction](formData).subscribe(() => {
        this.redirect.do(this.saveAction, this.item, this.parent, this.routeData);
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
            folder: this.routeItemSingular['folder'],
            lang: this.lang,
            id: this.itemForm.value['id']
          };

          this[`_${this.routeItem}`].remove(params).subscribe(() => {
            this.redirect.do('remove', this.item, this.parent, this.routeData);
          });
        }
      }
    );


  }

  /**
   * Changing remove-with-folder  checkbox state
   * @param e checkbox change event
   */
  changeWithFolderState(e: any) {
    this.withFolder.patchValue(e.target.checked ? '1' : '0');
  }

  /**
   * Gets selected image file
   * @param e drop zone-added-file event
   */
  onAddedFile(e) {

    this.dropzoneFiles.push(e);
  }

  /**
   * Removes current flag image from the drop zone
   */
  removeImage() {
    if (this.editCase) {
      this.routeItemSingular.flag_img = '';
    }
    this.dropzoneFiles = [];
    this.itemForm.controls['flag_img'].patchValue('');
  }

  /**
   * Gets direction data passed by route url
   * @returns route data direction
   */
  get routeItemSingular(): any {
    return _.get(this.routeData, this.item);
  }

  /**
   * Gets country name control for checking the field errors
   * @returns country name control
   */
  get itemName(): AbstractControl | null {
    return this.itemForm.get(`name_${this.lang}`);
  }


  /**
   * Get with folder checkbox control
   * @returns with folder checkbox control
   */
  get withFolder(): AbstractControl | null {
    return this.itemForm.get('with_folder');
  }

  /**
   * Gets flag name
   * @returns flag image file name
   */
  get flag(): string | undefined {
    return _.get(this.routeItemSingular, 'flag_img');
  }

  /**
   * Gets folder url for flag
   * @returns folder url of the direction
   */
  get folderUrl(): string {
    return `others/${this.routeData[this.item].folder}`;
  }

  get dropzoneMsg() {
    return this.item === 'story' ? 'story_dropzone_msg' : (this.item === 'location' ? 'location_dropzone_msg' : 'img_dropzone_msg');
  }
}
