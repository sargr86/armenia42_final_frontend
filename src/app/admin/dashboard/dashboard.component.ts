import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../../shared/services/dashboard.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  itemsStatistics;
  itemStatCols = ['name', 'count'];
  lang = this.getLang.transform();

  constructor(
    private _dashboard: DashboardService,
    private getLang: GetLangPipe
  ) {
  }

  ngOnInit() {
    this._dashboard.getItemStatistics().subscribe(dt => {
      this.itemsStatistics = dt;
    });
  }

}
