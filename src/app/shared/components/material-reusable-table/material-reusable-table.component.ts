import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SubjectService} from "../../services/subject.service";
import {MatPaginator, MatSlideToggleChange, MatTableDataSource} from "@angular/material";
import {GetMatTableDataSourcePipe} from "../../pipes/get-mat-table-data-source.pipe";

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
    private dataSource: GetMatTableDataSourcePipe
  ) {
  }

  ngOnInit() {

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

  getSymbol() {
    return {symbol: ''};
  }

}
