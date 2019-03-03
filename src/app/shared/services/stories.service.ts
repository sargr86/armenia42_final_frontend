import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Story} from '../models/Story';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets stories list
   * @param params language to retrieve stories list in that language
   * @returns stories observable
   */
  get(params): Observable<Story[]> {
    return this.httpClient.get<Story[]>(`${API_HOST}stories/get`, {params: params});
  }

  /**
   * Gets story data by name
   * @param params a story name to retrieve the story data
   * @returns story observable
   */
  getById(params): Observable<Story> {
    return this.httpClient.get<Story>(`${API_HOST}stories/get-by-id`, {params: params});
  }

  /**
   *  Sends data to add a new story
   * @param params new story parameters
   * @returns Story observable
   */
  add(params): Observable<Story> {
    return this.httpClient.post<Story>(`${API_HOST}stories/add`, params);
  }

  /**
   * Sends data to update the selected story data
   * @param params selected story parameters
   * @returns story observable
   */
  update(params): Observable<Story> {
    return this.httpClient.put<Story>(`${API_HOST}stories/update`, params);
  }

  /**
   * Removes the selected story data
   * @param params selected story parameters
   * @returns story observable
   */
  remove(params) {
    return this.httpClient.delete<Story>(`${API_HOST}stories/remove`, {params: params});
  }
}
