import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {MatPaginator, MatSlideToggleChange, MatTableDataSource} from "@angular/material";
import {GetMatTableDataSourcePipe} from "../../pipes/get-mat-table-data-source.pipe";
import {API_HOST, OTHER_UPLOADS_FOLDER, UPLOADS_FOLDER} from '../../constants/settings';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ReplaceAllPipe} from '../../pipes/replace-all.pipe';
import {Router} from '@angular/router';
import {ImagesService} from '../../services/images.service';
import {DashboardService} from '../../services/dashboard.service';

@Component({
  selector: 'app-mat-table',
  templateUrl: './material-reusable-table.component.html',
  styleUrls: ['./material-reusable-table.component.scss']
})
export class MaterialReusableTableComponent implements OnInit {
  @Input() cols;
  @Input() data;
  @Input() lang;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSrc: MatTableDataSource<any>;

  constructor(
    private subject: SubjectService,
    private dataSource: GetMatTableDataSourcePipe,
    private  sanitizer: DomSanitizer,
    private replace: ReplaceAllPipe,
    private router: Router,
    private _dashboard: DashboardService
  ) {
  }

  ngOnInit() {

    // Gets system changed language
    this.subject.getLanguage().subscribe(lang => {
      this.lang = lang;
    });

    // Gets table data changes
    this.subject.getTableData().subscribe(dt => {
      this.data = dt;
      this.setTableData();
    });


    this.setTableData();


  }

  /**
   * Sets table data and paginator
   */
  setTableData() {
    this.dataSrc = this.dataSource.transform(this.data);
    this.dataSrc.paginator = this.paginator;
  }

  /**
   * Toggles status, send the change to parent component
   * @param {MatSlideToggleChange} e
   * @param id
   */
  changeStatus(e: MatSlideToggleChange, id) {
    const status = e.checked;
    const sendObj = {id: id};
    sendObj['status'] = status ? 'active' : 'inactive';

    this.subject.setTableForm(sendObj);
  }

  /**
   * Changes image review status
   * @param el image element
   * @param status status of review
   */
  changeReviewStatus(el, status) {
    const sendObj = {id: el.id, status: status, lang: this.lang};
    this._dashboard.changeReviewStatus(sendObj).subscribe(dt => {
      this.data = dt;
      this.setTableData();
    });
    // this.subject.setTableItemForm(sendObj);
  }

  getSymbol() {
    return {symbol: ''};
  }

  /**
   * Gets image safe-styled url
   * @param el
   * @param col
   */
  getImgUrl(el, col): SafeStyle {
    let url = API_HOST + (col === 'img_path' ? '' : 'uploads/users/') + el[col];
    url = 'url("' + url + '")';
    return this.sanitizer.bypassSecurityTrustStyle(url);
  }

  /**
   * Navigates to image editing page
   * @param el
   */
  navigateToImg(el) {
    if (el['url']) {
      const url = el['url'];
      this.router.navigate([url]);
    }
  }

}
