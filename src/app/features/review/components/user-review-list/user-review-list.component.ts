import { CommonModule } from '@angular/common';
import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { ReviewListComponent } from '../review-list/review-list.component';

@Component({
  selector: 'app-user-review-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './user-review-list.component.html',
  styleUrl: './user-review-list.component.scss'
})
export class UserReviewListComponent implements OnInit {
  @Input() restaurantId: number = 0;

  userReviews: any[] = [];

  totalPage: number = 0;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(
    private router: Router,
    private reviewService: ReviewService,
    @Host() @Optional() private reviewListComponent: ReviewListComponent
  ) { }

  ngOnInit(): void {
    if (this.restaurantId > 0) {
      this.request.pageSize = 5;
      this.onReviewByRestaurant();
    }
    else {
      this.onReview();
    }
  }

  onReview(): void {
    this.reviewService.getReviewsByUser(this.request).subscribe({
      next: (response) => {
        this.userReviews = response.data;
        this.totalPage = Math.ceil(response.total / this.request.pageSize);
      }
    });
  }

  onReviewByRestaurant(): void {
    this.reviewService.getUserReviewsByRestaurant(this.restaurantId, this.request).subscribe({
      next: (response) => {
        this.userReviews = response.data;
        this.totalPage = Math.ceil(response.total / this.request.pageSize);
      }
    });
  }

  goToAddReview() {
    this.router.navigate(['/review/add'],
      {
        queryParams: { id: this.restaurantId }
      });
  }

  goToEditReview(reviewId: number) {
    this.router.navigate(['/review/edit'],
      {
        queryParams: { id: reviewId }
      });
  }

  onDelete(id: any): void {
    this.reviewService.deleteReview(id).subscribe({
      next: (response) => {
        this.ngOnInit();
        if (this.restaurantId > 0) {
          this.reviewListComponent.onReview();
          this.reviewListComponent.onAverageRating();
        }
      }
    });
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.ngOnInit();
  }
}
