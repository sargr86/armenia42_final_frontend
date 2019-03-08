import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import {Observable} from 'rxjs';

import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../services/auth.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(public router: Router,
              public toastr: ToastrService,
              public translate: TranslateService,
              public _auth: AuthService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((res: HttpResponse<any>) => {

    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this._auth.formProcessing = false;
        this._auth.removeLoading = false;
        switch (err.status) {
          // Express Validator errors
          case 422:
            this.translate.get(err.error.msg).subscribe((dt) => {
              this.toastr.error(dt);
            });
            break;
          // Multer errors
          case 423:

            this.translate.get(err.error).subscribe((dt) => {
              this.toastr.error(dt)
            });
            break;
          //Sequelize & other errors
          default:
            let name: any;
            let msg = '';
            let original = err.error.original;
            if (!err.error.hasOwnProperty('name')) {

              name = err.error;
            }
            else {
              name = err.error.name;
              if (original && original.hasOwnProperty('sqlMessage')) msg = original.sqlMessage;

              // MySQL isn't connected error
              if (name.includes('SequelizeConnectionRefusedError')) {
                name = 'db_connection_issues';
                msg = 'check_mysql_connection';
              }

            }

            if (name instanceof ProgressEvent) {
              this.translate.get(['unknown_error', 'check_server']).subscribe(d => {
                this.toastr.error(d['check_server'], d['unknown_error']);
              });
            }
            else if (name) {
              this.translate.get([msg, name]).subscribe(d => {
                this.toastr.error(d[msg], d[name]);
              });
            }

            break;


        }

      }
    }));
  }
}
