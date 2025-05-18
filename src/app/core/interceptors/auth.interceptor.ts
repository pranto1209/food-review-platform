import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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