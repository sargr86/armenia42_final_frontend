import {Component, OnInit} from '@angular/core';
import {DropzoneConfigInterface} from 'ngx-dropzone-wrapper';
import * as dropZoneConfig from '../../shared/constants/dropzone';
import {BuildFormDataPipe} from '../../shared/pipes/build-form-data.pipe';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {ImagesService} from '../../shared/services/images.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, ActivationEnd, Data, Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {Story} from '../../shared/models/Story';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.scss']
})
export class AddImagesComponent implements OnInit {

  lang: string = this.getLang.transform();
  imagesForm: FormGroup;
  routeData: Data;

  dropzoneFiles = [];
  dropzoneConfig: DropzoneConfigInterface;

  constructor(
    private buildFormData: BuildFormDataPipe,
    private getLang: GetLangPipe,
    private _images: ImagesService,
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public _auth: AuthService
  ) {
    // Setting drop zone configuration and stopping 'save-action' loader
    this.dropzoneConfig = dropZoneConfig['STORY_IMG_DROPZONE_CONFIG'];

    // Setting the images form fields
    this.imagesForm = this._fb.group({
      story_id: '',
      name_en: '',
      folder: '',
      lang: this.lang
    });

  }

  ngOnInit() {

    this.route.data.subscribe(dt => {
      this.imagesForm.patchValue({
        story_id: dt.story.id,
        name_en: dt.story.name_en,
        folder: dt.story.folder.toString()
      });
    });

  }

  /**
   * Adss images to the selected story
   */
  addImages() {

    // Building form data object and getting it
    const formData = this.buildFormData.transform(this.imagesForm.value, this.dropzoneFiles, 'story', this.lang);

    this._auth.formProcessing = true;
    this._images.add(formData).subscribe(dt => {
      this._auth.formProcessing = false;
      this.router.navigate([this.router.url.split('/').filter(n => n !== 'add').join('/')]);
    });

  }

  /**
   * Gets selected image file
   * @param e drop zone-added-file event
   */
  onAddedFile(e) {

    this.dropzoneFiles.push(e);
  }

  /**
   * Removes an image file from drop zone
   * @param e
   */
  removeImage(e) {
    this.dropzoneFiles = this.dropzoneFiles.filter(file => file[0].name !== e.name);
  }

  /**
   * Gets drop zone message for its diffrent types
   * @returns drop zone message
   */
  get dropzoneMsg(): string {
    return 'story_dropzone_msg';
  }

}
