import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {DashboardService} from '../../shared/services/dashboard.service';
import {SubjectService} from '../../shared/services/subject.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-show-user-images',
  templateUrl: './show-user-images.component.html',
  styleUrls: ['./show-user-images.component.scss']
})
export class ShowUserImagesComponent implements OnInit {
  lang = this.getLang.transform();
  images;
  columns = ['img_path', 'name', 'location', 'story', 'review_status'];
  selectedStatus = 'pending';

  constructor(
    private _images: ImagesService,
    private _dashboard: DashboardService,
    private getLang: GetLangPipe,
    private _subject: SubjectService,
    public _auth: AuthService
  ) {

    this._subject.getLanguage().subscribe(lang => {
      this.getImages(lang);
    });

    this._subject.getCatForm().subscribe(cat => {
      this.getImages(this.lang, cat);
    });

    this._subject.getFilterForm().subscribe(dt => {
      this.selectedStatus = dt.status;
      this.getImages(this.lang);
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
    const params = {lang: lang, user_id: this._auth.userData.id, status: this.selectedStatus};
    if (cat_id) {
      params['cat_id'] = cat_id;
    }
    this._dashboard.getUserImages(params).subscribe(dt => {
      this.images = dt;
      this._subject.setTableData(dt);
    });
  }

}
