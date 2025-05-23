import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  user?: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });
    
    this.user = this.authService.getUser();
  }

  goToUserSettings(): void {
    this.router.navigate(['/user-settings']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
