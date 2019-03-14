import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {DashboardService} from '../../shared/services/dashboard.service';
import {SubjectService} from '../../shared/services/subject.service';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.scss']
})
export class ManageImagesComponent implements OnInit {
  lang = this.getLang.transform();
  images;
  columns = ['img_name', 'full_name','img_actions'];


  constructor(
    private _images: ImagesService,
    private _dashboard: DashboardService,
    private getLang: GetLangPipe,
    private _subject: SubjectService
  ) {

    this._subject.getLanguage().subscribe(lang => {
      this.getImages(lang);
    });

    this._subject.getCatForm().subscribe(cat => {
      this.getImages(this.lang, cat);
    });
  }

  ngOnInit() {

    this.getImages(this.lang);
  }

  /**
   * Gets manage images
   * @param lang language
   * @param cat_id category id
   */
  getImages(lang, cat_id = null) {
    const params = {lang: lang};
    if (cat_id) {
      params['cat_id'] = cat_id;
    }
    this._dashboard.getManageImages(params).subscribe(dt => {
      this.images = dt;
      this._subject.setTableData(dt);
    });
  }

}
