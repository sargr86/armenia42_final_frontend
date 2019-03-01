import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Location} from '../models/Location';
import {Observable} from 'rxjs/internal/Observable';
import {API_HOST} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets locations list
   * @param params language to retrieve locations list in that language
   * @returns locations observable
   */
  get(params): Observable<Location[]> {
    return this.httpClient.get<Location[]>(`${API_HOST}locations/get`, {params: params});
  }

  /**
   * Gets location data by name
   * @param params a Location name to retrieve the Location data
   * @returns Location observable
   */
  getByName(params): Observable<Location> {
    return this.httpClient.get<Location>(`${API_HOST}locations/get-by-name`, {params: params});
  }

  /**
   *  Sends data to add a new location
   * @param params new location parameters
   * @returns location observable
   */
  add(params): Observable<Location> {
    return this.httpClient.post<Location>(`${API_HOST}locations/add`, params);
  }

  /**
   * Sends data to update the selected location data
   * @param params selected location parameters
   * @returns location observable
   */
  update(params): Observable<Location> {
    return this.httpClient.put<Location>(`${API_HOST}locations/update`, params);
  }

  /**
   * Removes the selected location data
   * @param params selected location parameters
   * @returns location observable
   */
  remove(params) {
    return this.httpClient.delete<Location>(`${API_HOST}locations/remove`, {params: params});
  }
}
