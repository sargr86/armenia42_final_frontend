import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {map} from "rxjs/operators";
import {GetLangPipe} from "./shared/pipes/get-lang.pipe";

import {language} from './shared/constants/language';
import {TranslateService} from "@ngx-translate/core";
import {AuthService} from "./shared/services/auth.service";
import {SubjectService} from "./shared/services/subject.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  savedLang: string = this.getLang.transform();
  pageTitle: string;
  routeSubscription: Subscription;
  viewMode = 'list';

  constructor(
    private getLang: GetLangPipe,
    public translate: TranslateService,
    public _auth: AuthService,
    private _subject: SubjectService,
    public router: Router,
    private route: ActivatedRoute,
    private _title: Title,
  ) {
    // Setting languages for the app
    translate.addLangs(language.supported);

    // This language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(language.default);

    // The lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.savedLang);

    // Subscribes to system language changes
    this._subject.getLanguage().subscribe(lang => {
      this.savedLang = lang;
      this.setPageTitle();
    });

    this._subject.getNavForm().subscribe(d => {
      this.viewMode = d.viewMode;
    });

  }


  ngOnInit() {
    // Getting current page title
    this.routeSubscription = this.router.events.pipe(map(() => {
      let child = this.route.firstChild;
      while (child) {
        if (child.firstChild) {
          child = child.firstChild;
        } else if (child.snapshot.data && child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        } else {
          return null;
        }
      }
      return null;
    })).subscribe(title => {
      this.pageTitle = title;
      this.setPageTitle();
      this._subject.setPageTitle(title);
    });
  }

  /**
   * Sets current page title
   */
  setPageTitle() {
    if (this.pageTitle) {
      this.translate.get(this.pageTitle).subscribe(t => {
        this._title.setTitle(t);
      });
    }
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
