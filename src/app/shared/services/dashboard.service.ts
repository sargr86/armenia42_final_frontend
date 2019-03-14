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
}
