import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {SubjectService} from '../../shared/services/subject.service';
import {Image} from '../../shared/models/Image';
import {AuthService} from '../../shared/services/auth.service';
import {OTHER_UPLOADS_FOLDER, UPLOADS_FOLDER} from '../../shared/constants/settings';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  lang = this.getLang.transform();
  images: Image[];
  viewMode = 'list';
  routeData: Data;

  galleryOptions;
  galleryImages;

  constructor(
    private _images: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private getLang: GetLangPipe,
    private _subject: SubjectService,
    public _auth: AuthService,
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe((dt: Data) => {
      this.routeData = dt;
      this._subject.getLanguage().subscribe(lang => {
        this.lang = lang;
        this.getImages(dt, lang);
      });
      this._subject.getNavForm().subscribe(d => {
        this.viewMode = d.viewMode;
        this.getImages(dt, this.lang);
      });

      this.getImages(dt, this.lang);
    });

  }

  /**
   * Gets images list
   * @param dt route data
   * @param lang current languge of the system
   */
  getImages(dt, lang) {
    const params = {story_id: dt.story.id, lang: lang};
    this._images.get(params).subscribe(data => {

      // if (this.viewMode === 'gallery') {
      //
      // }  else {
      this.prepareGalery(data);

      // }

    });
  }

  /**
   * Prepares the gallery options and images
   * @param dt
   */
  prepareGalery(dt) {
    let self = this;


    // Setting ngx-gallery options
    this.galleryOptions = [
      {
        'previewFullscreen': true,
        'width': '50%',
        'previewKeyboardNavigation': true,
        'imageDescription': true,
        'previewCloseOnEsc': true,
        'imageActions': [{
          icon: 'fa fa-times-circle', onClick: () => {
            // self.subject.setSlideshow(true);
          }, titleText: 'delete'
        }]
      },
      {'breakpoint': 500, 'width': '300px', 'height': '300px', 'thumbnailsColumns': 3},
      {'breakpoint': 300, 'width': '100%', 'height': '200px', 'thumbnailsColumns': 2},

    ];

    // Preparing gallery images data
    if (dt) {
      dt.map(img => {
        img.big = OTHER_UPLOADS_FOLDER + this.routeData['story']['folder'] + '/' + img['big'];
        img.medium = OTHER_UPLOADS_FOLDER + this.routeData['story']['folder'] + '/' + img['medium'];
        img.small = OTHER_UPLOADS_FOLDER + this.routeData['story']['folder'] + '/' + img['small'];
      });
      this.galleryImages = dt;
    }
  }


  getImgUrl(url) {
    url = 'url("' + url + '")';
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

}
