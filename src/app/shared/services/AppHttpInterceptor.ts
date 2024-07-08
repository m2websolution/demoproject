import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpResponse,HttpHandler,HttpEvent,HttpErrorResponse,} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate,CanDeactivate ,Router, RouterStateSnapshot } from '@angular/router';
import { CommonService } from './common.services';
import { AppConstant } from '../constants';
declare const $:any;

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router,private commonService:CommonService) {
  }

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem(AppConstant.localStorage_Token);
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token),
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    //$("#loading").show();
    this.commonService.SpinnerObervable(true);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

          this.commonService.SpinnerObervable(false);
        }

        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.commonService.SpinnerObervable(false);
        // this.sharedService.hideSpinner();
        // if (err.status == 401 || err.status == 403) {
        //   this.authService.logout();
        //   localStorage.clear();
        //   this.sharedService.errorToast(err.error.message);
        //   this.router.navigate(['/auth/login']);
        // }
        // if (err.status == 400) {
        //   if (err.error.errors) {
        //     err.error.errors.forEach((element) => {
        //       this.sharedService.errorToast(element);
        //     });
        //   }
        // }
        // if (err.status == 404) {
        //   this.sharedService.errorToast('Not Found');
        // }
        return throwError(err);
      })
    );
  }
}


