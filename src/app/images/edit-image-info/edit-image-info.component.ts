import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from '@angular/forms';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import ImageInfoFields from '../../shared/helpers/get-image-info-fields';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {AuthService} from '../../shared/services/auth.service';
import {BuildCoverItemsPipe} from '../../shared/pipes/build-cover-items.pipe';
import FormInfoBoxData from '../../shared/helpers/get-info-box-data-for-forms';
import {ConfirmationDialogComponent} from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-image-info',
  templateUrl: './edit-image-info.component.html',
  styleUrls: ['./edit-image-info.component.scss']
})
export class EditImageInfoComponent implements OnInit {
  editImageInfoForm: FormGroup;
  lang: string;
  routeData: Data;
  makeCover = false;
  coverItems: any;
  infoBoxData: any;
  startYear = 1960;
  currentYear = moment().format('YYYY');

  constructor(
    private _fb: FormBuilder,
    private getLang: GetLangPipe,
    private route: ActivatedRoute,
    public router: Router,
    private _images: ImagesService,
    public _auth: AuthService,
    private buildCoverItems: BuildCoverItemsPipe,
    private dialog: MatDialog
  ) {

    // Getting current language and initializing the image image info form
    this.lang = this.getLang.transform();
    this.editImageInfoForm = this._fb.group(ImageInfoFields.get() as any);

  }

  ngOnInit() {
    this.route.data.subscribe(dt => {
      this.routeData = dt;

      if (this.image) {
        // Getting cover items list
        this.coverItems = this.buildCoverItems.transform(this.image);

        // Getting data for info box for different language cases
        this.infoBoxData = FormInfoBoxData.get(true, this.lang, 'image');

        // Applying current image data to the form fields
        this.editImageInfoForm.patchValue(this.image);
      }


    });

  }

  /**
   * Saves an image data
   */
  saveImageInfo() {

    this._auth.formProcessing = true;
    if (this.editImageInfoForm.valid) {
      this._images.saveInfo(this.editImageInfoForm.value).subscribe(dt => {
        const redirectUrl = this.router.url.split('image')[0];
        this._auth.formProcessing = false;
        this.router.navigate([redirectUrl]);
      });
    }
  }

  /**
   * Makes the selected image a  cover of the story
   * @param id
   */
  setAsCover(id) {

    // const params = {lang: this.lang, id: id, cover: cover};
  }

  /**
   * Sets image description to be translated
   */
  setAsTranslateable() {
    const translate = this.translateState ? 1 : 0;
    this.editImageInfoForm.patchValue({'translate': translate});
  }

  /**
   * Marks the selected image as favorite
   * @param id
   */
  setAsFavorite(id) {
    const fav = this.favState ? 1 : 0;
    this.editImageInfoForm.patchValue({'favorite': fav});
  }

  /**
   * Toggles cover items drop down
   */
  coverItemToggle() {
    this.makeCover = !this.makeCover;
    const cover = this.makeCover ? 1 : 0;
    this.editImageInfoForm.patchValue({cover: cover});
  }

  /**
   * Removes the selected image
   * @param id
   */
  remove(id) {

    // Setting dialog properties
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      autoFocus: true,
      width: '300px'
    });

    // Post-confirming actions
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this._auth.removeProcessing = true;
          const params = {
            id: id, story_id: this.image.story.id,
            lang: this.lang, withFile: this.withFile.value,
            file: this.image.folder
          };
          this._images.remove(params).subscribe(dt => {
            const redirectUrl = this.router.url.split('image')[0];
            this._auth.removeProcessing = false;
            this.router.navigate([redirectUrl]);
          });
        }
      });
  }

  /**
   * Translate image description state (yes|no)
   * @returns {any}
   */
  get translateState() {
    return this.editImageInfoForm.get('translate').value;
  }

  /**
   * Marks image as favorite state (yes|no)
   * @returns {any}
   */
  get favState() {
    return this.editImageInfoForm.get('fav').value;
  }

  /**
   * Gets directly image data
   * @returns route image data
   */
  get image() {
    return this.routeData.image;
  }

  /**
   * Get with file checkbox control
   * @returns with file checkbox control
   */
  get withFile()
    :
    AbstractControl | null {
    return this.editImageInfoForm.get('with_file');
  }

  /**
   * Changing remove-with-file checkbox state
   * @param e checkbox change event
   */
  changeWithFileState(e
                        :
                        any
  ) {
    this.withFile.patchValue(e.target.checked ? '1' : '0');
  }

}
