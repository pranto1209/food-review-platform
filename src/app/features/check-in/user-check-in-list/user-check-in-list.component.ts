import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckInService } from '../services/check-in.service';

@Component({
  selector: 'app-user-check-in-list',
  templateUrl: './user-check-in-list.component.html',
  styleUrls: ['./user-check-in-list.component.css']
})
export class UserCheckInListComponent {

  userCheckIns: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService) {
  }

  ngOnInit(): void {

    this.checkInService.getCheckInsByUser()
      .subscribe({
        next: (response) => {
          this.userCheckIns = response;
        }
      });
  }

  onDelete(id: any): void {
    this.checkInService.deleteCheckIn(id)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      })
  }
}
