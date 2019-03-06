import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Router} from '@angular/router';

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

@Component({
  selector: 'show-items',
  templateUrl: './show-items.component.html',
  styleUrls: ['./show-items.component.scss']
})
export class ShowItemsComponent implements OnInit {

  @Input() parent: string;
  @Input() child: string;

  lang: string = this.getLang.transform();
  items: Observable<any>;
  storiesPage: boolean;

  constructor(
    public router: Router,
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


  }

  ngOnInit() {
    this.storiesPage = this.child === 'stories';
    this.getItems();
  }


  /**
   * Gets items list
   */
  getItems() {
    if (this.child) {
      // Getting router url filtered parts
      const splitterUrl = this.router.url.split('/');

      const params = {lang: this.lang, parent_name: splitterUrl[splitterUrl.length - 1]};
      this.items = this[`_${this.child}`].get(params);
    }

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
