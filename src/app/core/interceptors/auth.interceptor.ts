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
export class AuthInterceptor1 implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptRequest(request)) {
      const authRequest = request.clone({
        setHeaders: {
          'Authorization': this.cookieService.get('Authorization')
        }
      });

      return next.handle(authRequest);
    }
    return next.handle(request);
  }

  private shouldInterceptRequest(request: HttpRequest<any>): boolean {
    return request.urlWithParams.indexOf('addAuth=true', 0) > -1? true: false;
  }
}

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt-token');
    const userId = localStorage.getItem('user-id');

    let headers = req.headers;
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (userId) {
      headers = headers.set('UserId', userId);
    }

    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }
}
