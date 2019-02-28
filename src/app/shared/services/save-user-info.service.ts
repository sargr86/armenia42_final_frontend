import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import * as jwtDecode from 'jwt-decode';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class SaveUserInfoService {

  constructor(
    private _auth: AuthService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
  }

  /**
   * Saves authenticated user data
   * @param dt
   * @param edit
   * @param login
   * @returns {any}
   */
  do(dt, edit = false, login = false) {
    this._auth.formProcessing = false;

    if (!edit) {


      // Saving token to browser local storage
      localStorage.setItem('token', (dt.hasOwnProperty('token') ? dt.token : ''));

      // Gets current user data
      this._auth.userData = jwtDecode(localStorage.getItem('token'));
      localStorage.setItem('cat_id', '');
    }


    // Navigate to the home page
    this.router.navigate([this._auth.checkRoles('admin') ? 'admin' : '/']);

    if (!login) {
      this.translate.get(!edit ? 'welcome_to_team' : 'profile_info_updated').subscribe(tr => {
        this.toastr.success(tr);
      });
    }


  }
}
