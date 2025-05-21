import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../../../shared/models/user';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/Auth/login-user`, model);
  }

  registration(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/Auth/register-user`, model);
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  setUser(user: User): void {
    this.$user.next(user);

    localStorage.setItem('user-id', user.userId);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  getUser(): User | undefined {
    const userId = localStorage.getItem('user-id');
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (userId && email && roles) {
      const user: User = {
        userId: userId,
        email: email,
        roles: roles.split(','),
      };
      return user;
    }
    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
}
