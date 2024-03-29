import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';


// JWT helper
import {JwtHelperService} from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';


import {User} from "../models/User";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {
    // Gets environment-sensitive api host url
    domain: string = environment.apiHost;
    userData: User;
    formProcessing = false; // regular button spinner state
    removeLoading = false; // remove button spinner state

    constructor(
        private httpClient: HttpClient,
        private jwtHelper: JwtHelperService,
        private router: Router
    ) {
        //Receiving user data from here!!!!
        if (this.loggedIn()) {
            let token = localStorage.getItem('token');
            this.userData = jwtDecode(token);
        }
    }

    /**
     * Sends data for user registration
     * @param params
     * @returns {Observable<Object>}
     */
    register(params) {
        return this.httpClient.post(`${this.domain}auth/register`, params);
    }

    /**
     * Checks to see if user logged in/ token expired
     */
    loggedIn() {
        return !this.jwtHelper.isTokenExpired();
    }

    /**
     * Sends login credentials
     * @param formData
     */
    login(formData) {
        return this.httpClient.post<User>(`${this.domain}auth/login`, formData);
    }


    /**
     * Checks current user roles
     * @param role
     */
    checkRoles(role: string) {
        if (this.loggedIn() && this.userData) {
            return this.userData.roles.map(r => {
                return (r['name_en'].toLowerCase().replace(' ', '_') === role);
            }).some(Boolean)
        }
        return false;
    }

    /**
     * Logs out the current user
     */
    logout() {
        localStorage.setItem('token', '');
        this.router.navigate(['login']);
    }

    /**
     * Saves user profile details
     * @param params
     * @returns {Observable<User>}
     */
    update(params){
        return this.httpClient.put<User>(`${this.domain}auth/update-profile`, params)
    }
}
