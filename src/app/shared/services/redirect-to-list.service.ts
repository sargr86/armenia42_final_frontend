import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectToListService {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private _auth: AuthService
  ) {
  }

  do(action, item) {
    this._auth.removeLoading = false;
    this._auth.formProcessing = false;
    let url: string = this.router.url.substring(0, this.router.url.lastIndexOf('/'));
    if (action !== 'add') url = url.substring(0, url.lastIndexOf('/'));

    this.router.navigate([url]);
    const msg = `${item}_${action}_success`;
    this.translate.get([msg]).subscribe(dt => {
      this.toastr.success('', dt[msg]);
    });
  }
}
