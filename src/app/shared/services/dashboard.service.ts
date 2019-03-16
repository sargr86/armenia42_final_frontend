import {Injectable} from '@angular/core';
import {Country} from '../models/Country';
import {HttpClient} from '@angular/common/http';
import {API_HOST} from '../constants/settings';
import {Image} from '../models/Image';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  /**
   * Gets main items (countries,province,etc.) statistics
   */
  getItemStatistics(): Observable<any> {
    return this.httpClient.get<any>(`${API_HOST}dashboard/get-item-statistics`);
  }

  /**
   * Gets all images for managing
   */
  getManageImages(params): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${API_HOST}dashboard/get-manage-images`, {params: params});
  }

  /**
   * Gets one user images
   * @param params
   */
  getUserImages(params): Observable<Image[]> {
    return this.httpClient.get<Image[]>(`${API_HOST}dashboard/get-user-images`, {params: params});
  }

  /**
   * Changes an image review status
   * @param params
   */
  changeReviewStatus(params): Observable<Object> {
    return this.httpClient.put(`${API_HOST}dashboard/change-review-status`, params);
  }

  /**
   * Gets review status filters list
   * @param params
   * @returns {Observable<ArrayBuffer>}
   */
  getReviewStatusFilters(params) {
    return this.httpClient.get(`${API_HOST}dashboard/get-review-status-filters`, params);
  }
}
