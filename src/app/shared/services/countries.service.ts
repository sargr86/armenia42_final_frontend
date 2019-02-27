import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country} from '../models/Country';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable()
export class CountriesService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets countries list
   * @param params language to retrieve countries list in that language
   * @returns countries observable
   */
  get(params): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${API_HOST}countries/get`, {params: params});
  }

  /**
   * Gets country data by name
   * @param params a country name to retrieve the country data
   * @returns country observable
   */
  getByName(params): Observable<Country> {
    return this.httpClient.get<Country>(`${API_HOST}countries/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new country
   * @param params new country parameters
   * @returns country observable
   */
  add(params): Observable<Country> {
    return this.httpClient.post<Country>(`${API_HOST}countries/add`, params);
  }

  /**
   * Sends data to update the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  update(params): Observable<Country> {
    return this.httpClient.put<Country>(`${API_HOST}countries/update`, params);
  }

  /**
   * Removes the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  remove(params) {
    return this.httpClient.delete<Country>(`${API_HOST}countries/remove`, {params: params});
  }


}
