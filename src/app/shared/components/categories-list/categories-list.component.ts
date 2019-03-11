import {Component, Input, OnInit} from '@angular/core';
import {GetLangPipe} from '../../pipes/get-lang.pipe';
import {Router} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-cat-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @Input() orientation;
  lang = this.getLang.transform();
  categories;

  constructor(
    private _categories: CategoriesService,
    private getLang: GetLangPipe,
    public router: Router,
    private _subject: SubjectService
  ) {
  }

  ngOnInit() {
    const params = {};
    this.categories = this._categories.getCategories(params);

    // Getting system current language if changed by language component
    this._subject.getLanguage().subscribe(lang => {
      this.lang = lang;
    });
  }


  /**
   * Compares saved and current categories in categories loop
   * @param cat
   * @returns {boolean}
   */
  getActiveCategory(cat) {
    const savedCat = +localStorage.getItem('cat_id');
    return cat.value === savedCat || (savedCat === 0 && cat.value === 1);

  }

}
