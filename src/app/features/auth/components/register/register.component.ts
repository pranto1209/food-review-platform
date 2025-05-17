import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterRequest } from '../../models/register.request';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  model: RegisterRequest = {
    userName: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
    private router: Router) {
  }

  onFormSubmit(): void {
    this.authService.registration(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/login');
        },
        error: (error) => {
          alert('User already exists');
        }
      });
  }

  registerWithFacebook(): void {
  }

  registerWithGoogle(): void {

  }
}
