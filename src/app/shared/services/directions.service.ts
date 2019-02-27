import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Direction} from '../models/Direction';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable()
export class DirectionsService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets directions list
   * @param params language to retrieve directions list in that language
   * @returns directions observable
   */
  get(params): Observable<Direction[]> {
    return this.httpClient.get<Direction[]>(`${API_HOST}directions/get`, {params: params});
  }

  /**
   * Gets country data by name
   * @param params a country name to retrieve the country data
   * @returns country observable
   */
  getByName(params): Observable<Direction> {
    return this.httpClient.get<Direction>(`${API_HOST}directions/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new country
   * @param params new country parameters
   * @returns country observable
   */
  add(params): Observable<Direction> {
    return this.httpClient.post<Direction>(`${API_HOST}directions/add`, params);
  }

  /**
   * Sends data to update the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  update(params): Observable<Direction> {
    return this.httpClient.put<Direction>(`${API_HOST}directions/update`, params);
  }

  /**
   * Removes the selected country data
   * @param params selected country parameters
   * @returns country observable
   */
  remove(params) {
    return this.httpClient.delete<Direction>(`${API_HOST}directions/remove`, {params: params});
  }


}
