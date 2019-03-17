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

    this.getCategories();

    // Getting system current language if changed by language component
    this._subject.getLanguage().subscribe(lang => {
      this.lang = lang;
      this.getCategories();
    });
  }


  getCategories() {
    const params = {lang: this.lang};
    this._categories.getCategories(params).subscribe(dt => {
      this.categories = dt;
      if (this.categories) {
        const savedCat = +localStorage.getItem('cat_id');
        const foundCat = this.categories.filter(n => n.value === savedCat)[0];
        if (foundCat) {
          this.getActiveCategory(foundCat);
          this.getCategorizedItems(foundCat);
        }
      }

    });
  }

  /**
   * Compares saved and current categories in categories loop
   * @param cat category object
   */
  getActiveCategory(cat): boolean {
    const savedCat = +localStorage.getItem('cat_id');
    return cat.value === savedCat || (savedCat === 0 && cat.value === 1);

  }

  /**
   * Saves selected category and get items that match current category
   * @param cat category object
   */
  getCategorizedItems(cat) {

    // Saving selected category id
    localStorage.setItem('cat_id', cat.icon === 'ban' ? '' : cat.value);

    // Passing it to other components that subscribed via subject
    this._subject.setCatForm(cat.icon === 'ban' ? null : cat.value);

  }

}
