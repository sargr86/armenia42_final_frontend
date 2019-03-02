import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';
import {ReplaceAllPipe} from '../pipes/replace-all.pipe';
import {BuildFolderUrlPipe} from '../pipes/build-folder-url.pipe';

@Injectable({
  providedIn: 'root'
})
export class RedirectToListService {

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router,
    private _auth: AuthService,
    private replace: ReplaceAllPipe,
    private folderUrl: BuildFolderUrlPipe
  ) {
  }

  do(action, item, parent, data) {

    // Stopping all loaders
    this._auth.removeLoading = false;
    this._auth.formProcessing = false;

    // Getting generated url for each cases described below
    const url = this.generateUrl(action, item, parent, data)

    // Redirecting to the generated url
    this.router.navigate([url]);

    // Displaying success message
    const msg = `${item}_${action}_success`;
    this.translate.get([msg]).subscribe(dt => {
      this.toastr.success('', dt[msg]);
    });
  }

  generateUrl(action, item, parent, data) {
    let url;

    // Country case
    if (item === 'country') {
      url = 'world/countries';

      // Non-country case
    } else {


      // Edit-remove-item case
      if (action !== 'add') {
        url = this.folderUrl.transform(this.router.url, true);
        // Add-item case
      } else {

        url = data[parent]['folder'];
      }
    }


    return url;
  }
}
