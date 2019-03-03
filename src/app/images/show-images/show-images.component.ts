import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../shared/services/images.service';
import {ActivatedRoute, Data} from '@angular/router';
import {GetLangPipe} from '../../shared/pipes/get-lang.pipe';
import {SubjectService} from '../../shared/services/subject.service';
import {Observable} from 'rxjs/internal/Observable';
import {Image} from '../../shared/models/Image';

@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.scss']
})
export class ShowImagesComponent implements OnInit {
  lang = this.getLang.transform();
  images: Observable<Image[]>;

  constructor(
    private _images: ImagesService,
    private route: ActivatedRoute,
    private getLang: GetLangPipe,
    private _subject: SubjectService
  ) {

  }

  ngOnInit() {
    this.route.data.subscribe((dt: Data) => {
      this._subject.getLanguage().subscribe(lang => {
        this.lang = lang;
        this.getImages(dt, lang);
      });
      this.getImages(dt, this.lang);
    });

  }

  /**
   * Gets images list
   * @param dt route data
   * @param lang current languge of the system
   */
  getImages(dt, lang) {
    const params = {story_id: dt.story.id, lang: lang};
    this.images = this._images.get(params);
  }

}
