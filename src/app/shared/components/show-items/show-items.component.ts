import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {ActivatedRoute, Router} from '@angular/router';

import {GetLangPipe} from '../../pipes/get-lang.pipe';
import {ReplaceAllPipe} from '../../pipes/replace-all.pipe';
import {GenerateChildItemUrlPipe} from '../../pipes/generate-child-item-url.pipe';

import {AuthService} from '../../services/auth.service';
import {SubjectService} from '../../services/subject.service';
import {CountriesService} from '../../services/countries.service';
import {ProvincesService} from '../../services/provinces.service';
import {DirectionsService} from '../../services/directions.service';
import {LocationsService} from '../../services/locations.service';
import {StoriesService} from '../../services/stories.service';
import {NgxGalleryImage} from 'ngx-gallery';

@Component({
  selector: 'show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss']
})
export class ShowItemsComponent implements OnInit {

  @Input() parent: string;
  @Input() child: string;

  lang: string = this.getLang.transform();
  items = [];
  storiesPage: boolean;

  galleryImages: NgxGalleryImage[];


  constructor(
    public router: Router,
    private route: ActivatedRoute,
    private _countries: CountriesService,
    private _provinces: ProvincesService,
    private _directions: DirectionsService,
    private _locations: LocationsService,
    private _stories: StoriesService,
    private _subject: SubjectService,
    private getLang: GetLangPipe,
    public _auth: AuthService,
    private replace: ReplaceAllPipe,
    private getChildUrl: GenerateChildItemUrlPipe
  ) {
    this._subject.getLanguage().subscribe(lang => {
      this.lang = lang;
      this.getItems();
    });

    // Gets categorized items
    this._subject.getCatForm().subscribe((cat_id) => {
      this.getItems(cat_id);
      this.getParentImages();
    });


  }

  ngOnInit() {
    this.storiesPage = this.child === 'stories';
    this.getItems();
    this.getParentImages();
  }


  /**
   * Gets items list
   */
  getItems(cat_id = null) {
    if (this.child) {
      // Getting router url filtered parts
      const splitterUrl = this.router.url.split('/');

      // Setting an *item params
      const params = {lang: this.lang, parent_name: splitterUrl[splitterUrl.length - 1]};

      // Appending category if exist
      if (cat_id) {
        params['cat_id'] = cat_id;
      }
      this[`_${this.child}`].get(params).subscribe(dt => {
        this.items = dt;
      });
    }

  }

  /**
   * Gets images of parent element
   */
  getParentImages() {
    this.route.data.subscribe(dt => {
      if (dt && dt[dt.parent]) {

        this.galleryImages = dt[dt.parent]['images'];
      }
    });
  }


  /**
   * Gets child item url
   * @param item current item
   */
  getUrl(item) {
    return this.getChildUrl.transform(item, this.storiesPage, this.router.url);
  }

  /**
   * Gets edit item url
   * @param item current item
   */
  getEditUrl(item): string {
    return `${this.getUrl(item)}/edit`;
  }

}
