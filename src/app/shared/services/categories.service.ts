import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_HOST} from '../constants/settings';
import {Category} from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private httpClient: HttpClient
  ) {

  }



  /**
   * Gets the list of location categories
   * @param params
   * @param {boolean} all
   * @returns {Observable<Category[]>}
   */
  getCategories(params, all = true) {
    params['all'] = all ? 1 : 0;
    return this.httpClient.get<Category[]>(`${API_HOST}categories/get`, {params: params});
  }

  /**
   * Add a new location category
   * @param params
   * @returns {Observable<any>}
   */
  add(params) {
    // let data = {lang: this.auth.lang};
    // data['name_' + this.auth.lang] = cat;
    return this.httpClient.post<any>(`${API_HOST}categories/add`, params);
  }

  /**
   * Removes a category
   * @param params
   * @returns {Observable<any>}
   */
  remove(params) {
    // let params = {lang: this.auth.lang, id: id};
    return this.httpClient.get<any>(`${API_HOST}categories/remove`, {params: params});
  }
}
