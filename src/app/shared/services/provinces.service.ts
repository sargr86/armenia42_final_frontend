import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Province} from '../models/Province';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable()
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
   * Gets country data by name
   * @param params a country name to retrieve the country data
   * @returns country observable
   */
  getByName(params): Observable<Province> {
    return this.httpClient.get(`${API_HOST}provinces/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new country
   * @param params new country parameters
   * @returns country observable
   */
  add(params): Observable<Province> {
    return this.httpClient.post<Province>(`${API_HOST}provinces/add`, params);
  }

  /**
   * Sends data to update the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  update(params): Observable<Province> {
    return this.httpClient.put<Province>(`${API_HOST}provinces/update`, params);
  }

  /**
   * Removes the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  remove(params) {
    return this.httpClient.delete<Province>(`${API_HOST}province/remove`, {params: params});
  }


}
