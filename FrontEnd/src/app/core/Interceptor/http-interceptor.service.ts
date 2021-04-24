import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    debugger;
    if (req.urlWithParams.includes("pageNumber") || req.urlWithParams.includes("GetDataTablePaggedList")) {
      ///todo
    } else {
      this.spinner.show();
    }

    let token = localStorage.getItem('jwt');
    if (token !== undefined) {
      req = req.clone({
        setHeaders:
        {
          Authorization: `Bearer ${token}`,
          // 'Content-Type': 'application/json'
        }
      });
    }


    console.log(req);


    return next.handle(req).pipe(finalize(() => {
      // this.spinner.hide();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 200);

    }));









    //return next.handle(req);
  }
}
