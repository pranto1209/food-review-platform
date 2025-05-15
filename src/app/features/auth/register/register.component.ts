import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request.model';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  model: RegisterRequest = {
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
}
