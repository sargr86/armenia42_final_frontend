import {Injectable} from '@angular/core';
import {Country} from '../models/Country';
import {HttpClient} from '@angular/common/http';
import {API_HOST} from '../constants/settings';

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
   * @returns {Observable<any>}
   */
  getItemStatistics() {
    return this.httpClient.get<any>(`${API_HOST}dashboard/get-item-statistics`);
  }
}
