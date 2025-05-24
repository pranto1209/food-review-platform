import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckInService } from '../../services/check-in.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { AddCheckInRequest } from '../../models/add-check-in.request';

@Component({
  selector: 'app-user-check-in-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './user-check-in-list.component.html',
  styleUrl: './user-check-in-list.component.scss'
})
export class UserCheckInListComponent implements OnInit {
  @Input() restaurantId: number = 0;

  userCheckIns: any[] = [];

  model: AddCheckInRequest = {
    restaurantId: 0
  };

  totalPage: number = 0;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(private checkInService: CheckInService) { }

  ngOnInit(): void {
    if (this.restaurantId > 0) {
      this.model.restaurantId = this.restaurantId;
      this.request.pageSize = 5;
      this.onCheckInByRestaurant();
    }
    else {
      this.onCheckIn();
    }
  }

  onCheckIn(): void {
    this.checkInService.getCheckInsByUser(this.request).subscribe({
      next: (response) => {
        this.userCheckIns = response.data;
        this.totalPage = Math.ceil(response.total / this.request.pageSize);
      }
    });
  }

  onCheckInByRestaurant(): void {
    this.checkInService.getUserCheckInsByRestaurant(this.restaurantId, this.request).subscribe({
      next: (response) => {
        this.userCheckIns = response.data;
        this.totalPage = Math.ceil(response.total / this.request.pageSize);
      }
    });
  }

  addCheckIn(): void {
    this.checkInService.addCheckIn(this.model).subscribe({
      next: (response) => {
        this.ngOnInit();
      },
      error: (err) => {
        alert('You have already checked in this restaurant today');
      }
    });
  }

  onDelete(id: any): void {
    this.checkInService.deleteCheckIn(id).subscribe({
      next: (response) => {
        this.ngOnInit();
      }
    });
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.ngOnInit();
  }
}
