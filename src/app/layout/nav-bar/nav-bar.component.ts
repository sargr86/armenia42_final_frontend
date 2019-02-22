import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {SubjectService} from "../../shared/services/subject.service";
import {GetLangPipe} from "../../shared/pipes/get-lang.pipe";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
    selector: 'nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    lang: string = this.getLang.transform();
    routeSubscription: Subscription;
    pageTitle: string;

    constructor(
        public router: Router,
        public  _auth: AuthService,
        private subject: SubjectService,
        private getLang: GetLangPipe,
    ) {

        // Getting current title from title/subject service
        this.subject.getPageTitle().subscribe(title => {
            this.pageTitle = title;
        });

        // Getting system current language if changed by language component
        this.subject.getLanguage().subscribe(lang => {
            this.lang = lang;
        })
    }

    ngOnInit() {
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {

            }
        });
    }

    /**
     * Gets url for add-*item button
     * @returns {string}
     */
    getAddBtnUrl() {
        return `${this.router.url}/save`;
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

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
