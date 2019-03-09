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

  getImageById(params) {
    return this.httpClient.get<Image>(`${API_HOST}images/get-by-id`, {params: params});
  }

  /**
   * Adds images to the selected story
   * @param params images parameters
   */
  add(params): Observable<Image[]> {
    return this.httpClient.post<Image[]>(`${API_HOST}images/add`, params);
  }

  /**
   * Saves current image info
   * @param params image info parameters
   */
  saveInfo(params): Observable<Image> {
    return this.httpClient.put<Image>(`${API_HOST}images/update-info`, params);
  }

  /**
   * Removes an image from db and from the story folder
   * @param params
   */

  remove(params): Observable<Image> {
    console.log(params)
    return this.httpClient.delete<Image>(`${API_HOST}images/remove`, {params: params});
  }
}
