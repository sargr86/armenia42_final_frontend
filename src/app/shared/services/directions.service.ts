import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Direction} from '../models/Direction';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
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
   * Gets direction data by name
   * @param params a direction name to retrieve the direction data
   * @returns direction observable
   */
  getByName(params): Observable<Direction> {
    return this.httpClient.get<Direction>(`${API_HOST}directions/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new direction
   * @param params new direction parameters
   * @returns direction observable
   */
  add(params): Observable<Direction> {
    return this.httpClient.post<Direction>(`${API_HOST}directions/add`, params);
  }

  /**
   * Sends data to update the selected direction data
   * @param params selected direction parameters
   * @returns direction observable
   */
  update(params): Observable<Direction> {
    return this.httpClient.put<Direction>(`${API_HOST}directions/update`, params);
  }

  /**
   * Removes the selected direction data
   * @param params selected direction parameters
   * @returns direction observable
   */
  remove(params) {
    return this.httpClient.delete<Direction>(`${API_HOST}directions/remove`, {params: params});
  }
}
