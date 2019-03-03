import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivationEnd, Data, NavigationEnd, Router} from '@angular/router';
import {SubjectService} from '../../shared/services/subject.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  lang: string = this.getLang.transform();
  routeSubscription: Subscription;
  routeData: Data;
  pageTitle: string;
  navForm: FormGroup;
  viewMode = 'list';
  storyPage = false;

  breadCrumbParts = ['country', 'province', 'direction', 'location', 'story'];
  breadCrumbs = [];

  constructor(
    public router: Router,
    public  _auth: AuthService,
    private subject: SubjectService,
    private getLang: GetLangPipe,
    private _fb: FormBuilder
  ) {

    // Getting current title from title/subject service
    this.subject.getPageTitle().subscribe(title => {
      this.pageTitle = title;
    });

    // Getting system current language if changed by language component
    this.subject.getLanguage().subscribe(lang => {
      this.lang = lang;
    });

    this.navForm = this._fb.group({
      viewMode: this.viewMode,
      lang: this.lang
    });
  }

  ngOnInit() {
    let counter = 0;
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        ++counter;
        let data = event.snapshot.data;
        if (counter < 2) this.routeData = data;
        this.storyPage = 'story' in event.snapshot.params;
        this.updateBreadCrumbs(data, this.router.url, this.lang);
      }
    });
  }

  /**
   * Gets url for add-*item button
   * @returns {string}
   */
  getAddBtnUrl() {
    return `${this.router.url}/add`;
  }

  /**
   * Checks to see if we're on a form editing/saving/users page to toggle add-button
   * @returns {any}
   */
  get addBtnShow() {
    return !(/profile|users|edit|add|save/.test(this.router.url)) && this.pageTitle != 'admin_dashboard' && this.pageTitle !== undefined;
  }

  /**
   *
   * @returns {boolean}
   */
  get showSettings() {
    return !(/login|profile|register/.test(this.router.url));
  }

  /**
   * Changes images view mode in the selected story
   */
  changeImgsViewMode(mode) {
    this.viewMode = mode;
    this.navForm.controls.viewMode.setValue(mode);
    // this.auth.slideshow = this.viewMode == 'gallery';
    this.subject.setNavForm(this.navForm.value);
  }


  updateBreadCrumbs(data, url, lang = 'en') {
    this.breadCrumbs = [];
    if (this.breadCrumbs.length === 0) {
      if (lang === 'en') {
        let splittedUrl = url.split('/');
        splittedUrl.map(u => {
          if (!isNaN(parseFloat(u)) && isFinite(u)) {
            if (this.routeData.story.id == u) {
              u = this.routeData.story['name_en'];
            }
          }
          // else {
          u = u.replace('%20', ' ');
          u = u.replace('_', ' ');

          if (u) {
            this.breadCrumbs.push({name: u, link: u.toLowerCase()});
          }
          // }

        });
      } else {
        this.breadCrumbParts.map(p => {
          if (data.hasOwnProperty(p) && data[p]) {
            this.breadCrumbs.push({
              name: data[p]['name_' + lang],
              link: data[p]['name_en'].toLowerCase()
            });
          }
        });
      }

    }

  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
