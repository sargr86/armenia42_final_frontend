import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {SubjectService} from '../../shared/services/subject.service';
import {Image} from '../../shared/models/Image';
import {AuthService} from '../../shared/services/auth.service';
import {OTHER_UPLOADS_FOLDER} from '../../shared/constants/settings';
import {DomSanitizer} from '@angular/platform-browser';
import {NgxGalleryImage} from 'ngx-gallery';
import {ReplaceAllPipe} from '../../shared/pipes/replace-all.pipe';
import {Subscription} from 'rxjs/internal/Subscription';
import * as moment from 'moment';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit, OnDestroy {
  lang = this.getLang.transform();
  images: Image[];
  viewMode = 'list';
  routeData: Data;

  galleryOptions;
  galleryImages: NgxGalleryImage[];

  imageGetting: Subscription;
  routeSubscription: Subscription;
  navSubscription: Subscription;
  langSubscription: Subscription;

  startYear = 1970;
  endYear = +moment().format('YYYY');

  value = this.startYear;
  highValue = this.endYear;
  options = {
    floor: this.startYear,
    ceil: this.endYear
  };

  includeNullYear = true;

  constructor(
    private _images: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private getLang: GetLangPipe,
    private _subject: SubjectService,
    public _auth: AuthService,
    private sanitizer: DomSanitizer,
    private replace: ReplaceAllPipe
  ) {

  }

  ngOnInit() {

    this.routeSubscription = this.route.data.subscribe((dt: Data) => {
      this.routeData = dt;
      this.langSubscription = this._subject.getLanguage().subscribe(lang => {
        this.lang = lang;
        this.getImages(dt, lang);
      });
      this.navSubscription = this._subject.getNavForm().subscribe(d => {
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
    const params = {
      story_id: dt.story.id, lang: lang,
      start: this.startYear, end: this.endYear,
      includeNullYearValues: this.includeNullYear ? 1 : 0
    };
    this.imageGetting = this._images.get(params).subscribe(data => {
      this.prepareGalery(data);
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

  /**
   * Removes the selected image
   * @param id
   */
  remove(id) {
    const params = {
      id: id, story_id: this.routeData.story.id, lang: this.lang,
      start: this.startYear, end: this.endYear,
      includeNullYearValues: this.includeNullYear ? 1 : 0
    };
    this._images.remove(params).subscribe(dt => {
      this.prepareGalery(dt);
    });
  }


  getImgUrl(url) {
    url = 'url("' + url + '")';
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

  makeFav() {

  }

  /**
   * Navigates to the selected images info editing page
   * @param id image id
   */
  editImageInfo(id) {
    this.router.navigate([this.replace.transform(this.router.url + '/image/' + id, false)]);
  }

  /**
   * Checks if the selected story contains images
   */
  get imagesFound(): boolean {
    return this.galleryImages && Object.values(this.galleryImages).length > 0;
  }

  /**
   * Shows or hides the edit buttons of an image
   * @param i image
   */
  showEditButtons(i): boolean {
    return (this._auth.userData.email === i['user']['email'] && i['review_status']['name_en'] === 'pending')
      || this._auth.checkRoles('admin');
  }

  startYearChanged(e) {
    this.startYear = e;

  }

  endYearChanged(e) {
    this.endYear = e;
  }

  applyYearRange() {
    this.getImages(this.routeData, this.lang);
  }

  changeNullYear(e) {
    this.includeNullYear = e.checked;
    this.getImages(this.routeData, this.lang);
  }

  ngOnDestroy() {
    if (this.imageGetting) {
      this.imageGetting.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.navSubscription) {
      this.navSubscription.unsubscribe();
    }

    if (this.langSubscription) {
      this.langSubscription.unsubscribe();
    }
  }

}
