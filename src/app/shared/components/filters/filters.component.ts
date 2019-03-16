import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../services/dashboard.service';
import {GetLangPipe} from '../../pipes/get-lang.pipe';
import {SubjectService} from '../../services/subject.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  lang = this.getLang.transform();
  statusFilters;
  selectedStatus = 'pending';

  constructor(
    private _dashboard: DashboardService,
    private getLang: GetLangPipe,
    private _subject: SubjectService,
    private router: Router
  ) {
    this._subject.getLanguage().subscribe(lang => {
      this.lang = lang;
      this.getFilters();
    });
  }

  ngOnInit() {
    this.getFilters();
  }

  getFilters() {
    this.statusFilters = this._dashboard.getReviewStatusFilters({lang: this.lang});
  }

  changeReviewStatus(st) {
    const params = {lang: this.lang, status: st};
    this.selectedStatus = st;
    this._subject.setFilterForm(params);
    // this._dashboard.getManageImages(params).subscribe(dt => {
    //   this._subject.setTableData(dt);
    // });
  }

}
