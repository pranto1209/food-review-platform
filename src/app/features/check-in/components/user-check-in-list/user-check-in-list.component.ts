import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckInService } from '../../services/check-in.service';

@Component({
  selector: 'app-user-check-in-list',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user-check-in-list.component.html',
  styleUrl: './user-check-in-list.component.scss'
})
export class UserCheckInListComponent {

  userCheckIns: any[] = [];

  constructor(private checkInService: CheckInService) { }

  ngOnInit(): void {
    this.onCheckIn();
  }

  onCheckIn(): void {
    this.checkInService.getCheckInsByUser()
      .subscribe({
        next: (response) => {
          this.userCheckIns = response.data;
        }
      });
  }

  onDelete(id: any): void {
    this.checkInService.deleteCheckIn(id)
      .subscribe({
        next: (response) => {
          this.onCheckIn();
        }
      })
  }
}
