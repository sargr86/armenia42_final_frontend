import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Image} from '../models/Image';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets stories list
   * @param params language to retrieve stories list in that language
   * @returns stories observable
   */
  get(params): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${API_HOST}images/get`, {params: params});
  }
}
