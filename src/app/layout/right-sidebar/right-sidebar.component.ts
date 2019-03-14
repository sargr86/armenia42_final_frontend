import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivationEnd, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {SubjectService} from "../../shared/services/subject.service";

@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent implements OnInit {

  pageTitle: string;

  constructor(
    public router: Router,
    public _auth: AuthService,
    private route: ActivatedRoute,
    private subject: SubjectService
  ) {

    // Getting current title from title/subject service
    this.subject.getPageTitle().subscribe(title => {
      this.pageTitle = title;
    });
  }

  ngOnInit() {

  }

  /**
   * Navigates to home page or admin dashboard based on role
   */
  navigateHome() {
    this.router.navigate([this._auth.checkRoles('admin') ? '/admin' : '/'])
  }

  /**
   * Checks to see if we're on a form editing/saving page
   * @returns {any}
   */
  get formPage() {
    return (/save|edit|profile|register|add/.test(this.router.url));
  }

  get symbol() {
    return {symbol: ''};
  }

}
