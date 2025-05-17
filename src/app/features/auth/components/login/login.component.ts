import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRequest } from '../../models/login.request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
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
