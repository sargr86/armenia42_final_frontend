import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {DomSanitizer, SafeStyle, Title} from '@angular/platform-browser';
import {map} from 'rxjs/operators';
import {GetLangPipe} from './shared/pipes/get-lang.pipe';

import {language} from './shared/constants/language';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from './shared/services/auth.service';
import {SubjectService} from './shared/services/subject.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {ReplaceAllPipe} from './shared/pipes/replace-all.pipe';
import {API_HOST, OTHER_UPLOADS_FOLDER} from './shared/constants/settings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  savedLang: string = this.getLang.transform();
  pageTitle: string;
  routeSubscription: Subscription;
  viewMode = 'list';
  routeData: Data;

  constructor(
    private getLang: GetLangPipe,
    public translate: TranslateService,
    public _auth: AuthService,
    private _subject: SubjectService,
    public router: Router,
    private route: ActivatedRoute,
    private _title: Title,
    private sanitizer: DomSanitizer,
    private replace: ReplaceAllPipe
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
          this.routeData = child.data['value'];
        } else if (child.snapshot.data && child.snapshot.data['title']) {

          return child.snapshot.data['title'];
        } else {
          return null;
        }
      }
      return null;
    })).subscribe(title => {
      if (this.routeData) {
        this.getMainBg();
      }
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

  /**
   * Gets main background cover image url
   * @returns the safe-styled url
   */
  getMainBg(): SafeStyle {
    const dt = this.routeData;
    if (dt) {
      const parentData = dt[dt['parent']];
    // console.log(dt)
      if (parentData) {
        // console.log(dt['parent'])
        const imageData = parentData['images'];
        if (imageData && imageData.length > 0) {
          const coverPath = parentData['cover'];
          if (coverPath) {
            let url = 'url("' + API_HOST + coverPath.replace('public', '') + '")';
            url = this.replace.transform(url, false);
            return this.sanitizer.bypassSecurityTrustStyle(url);
          }
        }
      }
    }

  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }

}
