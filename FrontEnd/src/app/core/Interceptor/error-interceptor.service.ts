import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var res = next.handle(req);
    res.pipe(
      catchError((error: HttpErrorResponse) => {
        // process the obtained error
        // for logging or monitoring
        console.log("Interceptor Log: " + error.message);

        // create new Observable stream
        // which the clients
        // can subscribe and
        // catch the Erroneous response
        return throwError(error);
      }));

    return next.handle(req);

  }
}
