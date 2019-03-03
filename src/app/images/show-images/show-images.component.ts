import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {SubjectService} from '../../shared/services/subject.service';
import {Observable} from 'rxjs/internal/Observable';
import {Image} from '../../shared/models/Image';
import {AuthService} from '../../shared/services/auth.service';
import {GetStoryImageUrlPipe} from '../../shared/pipes/get-story-image-url.pipe';

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
    private getStoryImgUrl: GetStoryImageUrlPipe
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe((dt: Data) => {
      this.routeData = dt;
      this._subject.getLanguage().subscribe(lang => {
        this.lang = lang;
        this.getImages(dt, lang);
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
    this._images.get(params).subscribe(d => {
      this.images = d;
      if (this.viewMode === 'gallery') {
        this.prepareGalery(d);
      }

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
    console.log(this.routeData)


    // Preparing gallery images data
    if (dt) {
      dt.map(img => {
        img.big = this.routeData['story']['folder'] + img['big'];
        img.medium = this.routeData['story']['folder'] + img['medium'];
        img.small = this.routeData['story']['folder'] + img['small'];
        // img.medium = this.getStoryImgUrl.transform(this.router.url, img['name'], this.routeData);
        // img.small = this.getStoryImgUrl.transform(this.router.url, img['name'], this.routeData);
        // img.description = img['description_' + this.auth.lang];

      });
      this.galleryImages = dt.images;
    }
  }

}
