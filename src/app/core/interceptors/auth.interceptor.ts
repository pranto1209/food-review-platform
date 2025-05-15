import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.cookieService.get('Authorization');
    const userId = localStorage.getItem('user-id');

    let headers = request.headers;
    if (token) {
      headers = headers.set('Authorization', token);
    }
    if (userId) {
      headers = headers.set('UserId', userId);
    }

    const authRequest = request.clone({ headers });

    return next.handle(authRequest);
  }
}