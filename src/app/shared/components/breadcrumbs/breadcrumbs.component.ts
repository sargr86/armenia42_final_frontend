import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ReplaceAllPipe} from '../../pipes/replace-all.pipe';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  @Input() breadCrumbs;
  hovered = false;
  hoveredElement;
  animation = true;

  constructor(
    public router: Router,
    private replace: ReplaceAllPipe,
    public _auth: AuthService
  ) {

  }

  unavailableRoutes = ['images', 'image', 'story'];

  ngOnInit() {
  }

  /**
   * Gets the router path of a breadcrumb
   * @param el
   * @returns {any}
   */
  getPath(el) {


    // Finding the index of current item
    const index = this.breadCrumbs.findIndex(vendor => (vendor['link'] === el));

    if (index != undefined) {

      let pathElements;
      if (this.breadCrumbs.length > 1) {
        // Removing last item of breadcrumbs
        pathElements = this.breadCrumbs.slice(0, index + 1);
      }
      else {
        pathElements = this.breadCrumbs;
      }


      for (let i = 0; i < pathElements.length; i++) {
        pathElements[i] = this.replace.transform(pathElements[i]['link'], false)
      }

      return pathElements.join('/').toLowerCase();
    }
    return false;
  }

  /**
   * Heads to the given path formed by the selected breadcrumb
   * @param b
   */
  goToPath(b) {
    this.router.navigate([this.getPath(b)]);
  }

  /**
   * Checks if breadcrumb route address available
   * @param b
   * @returns {any}
   */
  checkAvailability(b) {
    return this.unavailableRoutes.some(r => {
      return b == r;
    })
  }

  /**
   * Mouse enter event on the breadcrumb
   * @param i
   */
  mouseEnter(i) {
    this.hoveredElement = i - 1;
    this.hovered = true;
  }

  /**
   * Mouse leave event on the breadcrumb
   *
   */
  mouseLeave() {
    this.hoveredElement = null;
    this.hovered = false;
  }

  /**
   * Checking if hovered breadcrumb value is smaller than the other breadcrumbs values in the loop
   * @param current
   * @returns {string}
   */
  getHoverValue(current) {
    return this.animation && this.hovered && current > this.hoveredElement && this.hoveredElement != null ? 'left' : 'right'
  }


}
