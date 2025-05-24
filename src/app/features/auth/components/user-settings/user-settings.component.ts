import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EditUserRequest } from '../../models/edit-user.request';
import { DeleteUserRequest } from '../../models/delete-user.request';

@Component({
  selector: 'app-user-settings',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.scss'
})
export class UserSettingsComponent {

  user: any;
  newPassword: string = '';
  currentPassword: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserById().subscribe({
      next: (response) => {
        this.user = response;
      }
    });
  }

  onFormSubmit(): void {
    const model: EditUserRequest = {
      userName: this.user.userName,
      email: this.user.email,
      password: this.newPassword,
      currentPassword: this.currentPassword
    };

    this.authService.editUser(model).subscribe({
      next: (response) => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Invalid email or password');
      }
    });
  }

  onDelete(): void {
    const confirmed = window.confirm('Are you sure you want to delete this account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    const model: DeleteUserRequest = {
      currentPassword: this.currentPassword
    };

    this.authService.deleteUser(model).subscribe({
      next: (response) => {
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (error) => {
        alert('Invalid email or password');
      }
    });
  }
}
