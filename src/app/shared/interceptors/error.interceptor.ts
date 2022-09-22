import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('inside Error Interceptor');
    return next.handle(request).pipe(
      catchError((err) => {
        console.log('Error::' + JSON.stringify(err));
        return throwError({
          status: err.status,
          statusText: err.statusText,
          error: err.error,
        });
      })
    );
  }
}
