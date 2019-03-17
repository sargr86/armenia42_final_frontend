import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
import {DEFAULT_COUNTRY} from '../../constants/settings';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss']
})
export class ShowItemsComponent implements OnInit, OnDestroy {

  @Input() parent: string;
  @Input() child: string;

  lang: string = this.getLang.transform();
  items = [];
  storiesPage: boolean;

  galleryImages: NgxGalleryImage[];
  category: number;

  languageSubscription: Subscription;
  categorySubscription: Subscription;
  routeSubscription: Subscription;

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
    this.languageSubscription = this._subject.getLanguage().subscribe(lang => {
      this.lang = lang;
      this.getItems();
    });

    // Gets categorized items
    this._subject.getCatForm().subscribe((cat_id) => {
      this.getItems(cat_id);
      this.getParentImages(cat_id);
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

      // Saving the selected category id
      this.category = cat_id;

      // Getting router url filtered parts
      const splitterUrl = this.router.url.split('/');

      // Getting parent from the router url last element
      let parentName = splitterUrl[splitterUrl.length - 1];

      // Home page case
      if (!parentName) {
        parentName = DEFAULT_COUNTRY;
      }

      // Setting an *item params
      const params = {lang: this.lang, parent_name: parentName};

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
   * Gets images of current item
   */
  getParentImages(cat_id = null) {
    this.routeSubscription = this.route.data.subscribe(dt => {

      if (dt && dt[dt.parent]) {
        // Setting an *item params
        const params = {lang: this.lang, parent_id: dt[dt.parent]['id']};

        // Appending category if exist
        if (cat_id) {
          params['cat_id'] = cat_id;
        }
        this[`_${this.child}`].getImages(params).subscribe(d => {
          this.galleryImages = d;
        });
      }
    });

  }


  /**
   * Gets child item url
   * @param item current item
   */
  getUrl(item): string {
    return this.getChildUrl.transform(item, this.storiesPage, this.router.url);
  }

  /**
   * Gets edit item url
   * @param item current item
   */
  getEditUrl(item): string {
    return `${this.getUrl(item)}/edit`;
  }

  /**
   * Shows or hides *item edit button
   */
  showEditButton(item): any | boolean {
    return this._auth.loggedIn() &&
      ((/directions|locations|stories/.test(this.child)) && item.user && item.user.email === this._auth.userData.email)
      || this._auth.checkRoles('admin');
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

}
