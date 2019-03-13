import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Province} from '../models/Province';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';
import {Image} from '../models/Image';

@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets provinces list
   * @param params language to retrieve provinces list in that language
   * @returns provinces observable
   */
  get(params): Observable<Province[]> {
    return this.httpClient.get<Province[]>(`${API_HOST}provinces/get`, {params: params});
  }

  /**
   * Gets the images of the selected province
   * @param params
   */
  getImages(params): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${API_HOST}provinces/get-images`, {params: params});
  }

  /**
   * Gets province data by name
   * @param params a province name to retrieve the province data
   * @returns country observable
   */
  getByName(params): Observable<Province> {
    return this.httpClient.get<Province>(`${API_HOST}provinces/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new province
   * @param params new province parameters
   * @returns country observable
   */
  add(params): Observable<Province> {
    return this.httpClient.post<Province>(`${API_HOST}provinces/add`, params);
  }

  /**
   * Sends data to update the selected province data
   * @param params selected province parameters
   * @returns country observable
   */
  update(params): Observable<Province> {
    return this.httpClient.put<Province>(`${API_HOST}provinces/update`, params);
  }

  /**
   * Removes the selected province data
   * @param params selected province parameters
   * @returns country observable
   */
  remove(params) {
    return this.httpClient.delete<Province>(`${API_HOST}provinces/remove`, {params: params});
  }
}
