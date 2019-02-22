import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Country} from "../models/Country";

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    // Gets environment-sensitive api host url
    domain: string = environment.apiHost;

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
        return this.httpClient.get<Country[]>(`${this.domain}countries/get`, {params: params});
    }

    /**
     * Gets country data by name
     * @param params
     * @returns {Observable<Country>}
     */
    getByName(params){
        return this.httpClient.get<Country>(`${this.domain}countries/get-by-name`, {params: params});
    }

    add(params){
        return this.httpClient.post<Country>(`${this.domain}countries/add`, params);
    }

    update(formData,urlParams){
        return this.httpClient.put<Country>(`${this.domain}countries/update?${urlParams}`, formData);
    }

    remove(params){
        return this.httpClient.delete<Country>(`${this.domain}countries/remove`, {params: params});
    }


}
