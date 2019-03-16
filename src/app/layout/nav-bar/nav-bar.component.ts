import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Data, NavigationEnd, Router} from '@angular/router';
import {SubjectService} from '../../shared/services/subject.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {AuthService} from '../../shared/services/auth.service';
import {Subscription} from 'rxjs/internal/Subscription';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UpdateBreadcrumbsService} from '../../shared/services/update-breadcrumbs.service';

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


  breadCrumbs = [];

  constructor(
    public router: Router,
    public  _auth: AuthService,
    private subject: SubjectService,
    private getLang: GetLangPipe,
    private _fb: FormBuilder,
    private updateBreadCrumbs: UpdateBreadcrumbsService,
    private route: ActivatedRoute
  ) {

    // Getting current title from title/subject service
    this.subject.getPageTitle().subscribe(title => {
      this.pageTitle = title;
    });

    this.navForm = this._fb.group({
      viewMode: this.viewMode,
      lang: this.lang
    });
  }


  ngOnInit() {

    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        const data = event.snapshot.data;
        const url = this.router.url;

        // Resetting story images view mode
        this.changeImgsViewMode('list');

        if (Object.entries(data).length !== 0) {
          // Getting system current language if changed by language component
          this.subject.getLanguage().subscribe(lang => {
            this.lang = lang;
            this.breadCrumbs = this.updateBreadCrumbs.do(data, url, lang);
          });


          this.routeData = data;
          this.breadCrumbs = this.updateBreadCrumbs.do(data, url, this.lang);
        }
      }

    });
  }

  /**
   * Gets url for add-*item button
   * @returns add-*item router url
   */
  getAddBtnUrl() {
    return `${this.router.url}/add`;
  }

  /**
   * Checks to see if we're on a form editing/saving/users page to toggle add-button
   */
  get addBtnShow(): boolean {
    return !(/profile|users|edit|add|save|manage/.test(this.router.url)) && this.pageTitle !== 'user_images_terminal'
      && this.pageTitle !== 'images_terminal' && this.pageTitle !== 'admin_dashboard' && this.pageTitle !== 'home' && this.pageTitle !== undefined;
  }

  /**
   * Shows settings button
   * @returns show settings getter
   */
  get showSettings(): boolean {
    return !(/login|profile|register/.test(this.router.url));
  }

  /**
   * Checks if we're on of the manage pages
   */
  get managePage(): boolean {
    return this.router.url.includes('manage');
  }

  /**
   * Changes images view mode in the selected story
   */
  changeImgsViewMode(mode) {
    this.viewMode = mode;
    this.navForm.controls.viewMode.setValue(mode);
    this.subject.setNavForm(this.navForm.value);
  }

  /**
   * Shows or hides breadcrumbs in auth-mode
   * @returns {boolean}
   */
  showAuthBreadCrumbs() {
    return !this.managePage && this.pageTitle !== 'home' && this.pageTitle !== 'user_images_terminal';
  }


  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
