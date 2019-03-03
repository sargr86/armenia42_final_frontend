import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../shared/services/categories.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {Router} from '@angular/router';
import {SubjectService} from '../../shared/services/subject.service';

@Component({
  selector: 'cat-bar',
  templateUrl: './cat-bar.component.html',
  styleUrls: ['./cat-bar.component.scss']
})
export class CatBarComponent implements OnInit {
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
