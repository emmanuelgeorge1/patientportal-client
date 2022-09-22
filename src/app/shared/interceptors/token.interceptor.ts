import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
const TOKEN_HEADER_KEY = 'x-access-token';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    console.log('inside JWT token interceptor');
    const token = localStorage.getItem('token');

    const NewToken = token.split(' ')[1];
    let str = NewToken;
    str = str.substring(0, str.length - 1);
    // console.log(str);

    if (str != null) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + str),
      });
    }

    return next.handle(authReq);
  }
  // intercept(
  //   req: Httpreq<any>,
  //   next: HttpHandler
  // ): Observable<HttpEvent<any>> {
  //   console.log('inside JWT token interceptor');

  //   const token = localStorage.getItem('token');
  //   const NewToken = token.split(' ')[1];

  //   if (NewToken != null) {
  //     req = req.clone({
  //       headers: req.headers.set('authorization', NewToken),
  //     });
  //   }

  //   return next.handle(req);
  // }
}
