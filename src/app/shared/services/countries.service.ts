import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Country} from "../models/Country";
import {API_HOST} from '../constants/settings';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets countries list
   * @param params
   * @returns {Observable<Country[]>}
   */
  get(params) {
    return this.httpClient.get<Country[]>(`${API_HOST}countries/get`, {params: params});
  }

  /**
   * Gets country data by name
   * @param params
   * @returns {Observable<Country>}
   */
  getByName(data) {
    return this.httpClient.get(`${API_HOST}countries/get-by-name`, {params: data});
  }

  add(params) {
    return this.httpClient.post<Country>(`${API_HOST}countries/add`, params);
  }

  update(params) {
    return this.httpClient.put<Country>(`${API_HOST}countries/update`, params);
  }

  remove(params) {
    return this.httpClient.delete<Country>(`${API_HOST}countries/remove`, {params: params});
  }


}
