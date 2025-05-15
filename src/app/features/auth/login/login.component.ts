import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
  }

  onFormSubmit(): void {
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');

          this.authService.setUser({
            userId: response.userId,
            email: response.email,
            roles: response.roles
          });

          this.router.navigateByUrl('/');
        },
        error: (error) => {
          alert('Incorrect email or password');
        }
      });
  }

  signInWithFacebook(): void {
  }

  signInWithGoogle(): void {
    
  }
}
