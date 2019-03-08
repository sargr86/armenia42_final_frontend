import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import ImageInfoFields from '../../shared/helpers/get-image-info-fields';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {ImagesService} from '../../shared/services/images.service';
import {AuthService} from '../../shared/services/auth.service';

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

  constructor(
    private _fb: FormBuilder,
    private getLang: GetLangPipe,
    private route: ActivatedRoute,
    public router: Router,
    private _images: ImagesService,
    public _auth: AuthService
  ) {
    this.lang = this.getLang.transform();
    this.editImageInfoForm = this._fb.group(ImageInfoFields.get() as any);
  }

  ngOnInit() {
    this.route.data.subscribe(dt => {
      this.routeData = dt;
      this.editImageInfoForm.patchValue(this.image);
    });

  }

  /**
   * Saves an image data
   */
  saveImageInfo() {

    if (this.editImageInfoForm.valid) {
      this._auth.formProcessing = true;
      this._images.saveInfo(this.editImageInfoForm.value).subscribe(dt => {
        const redirectUrl = this.router.url.split('image')[0];
        this._auth.formProcessing = false;
        this.router.navigate([redirectUrl]);
      });
    }
  }

  coverItemToggle() {
    this.makeCover = !this.makeCover;
    this.editImageInfoForm.get('cover').setValue(this.makeCover);
  }


  get translateState() {
    return this.editImageInfoForm.get('translate').value;
  }

  get favState() {
    return this.editImageInfoForm.get('favorite').value;
  }

  /**
   * Gets directly image data
   * @returns route image data
   */
  get image() {
    return this.routeData.image;
  }

}
