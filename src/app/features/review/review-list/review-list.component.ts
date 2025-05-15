import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { CheckInService } from '../../check-in/services/check-in.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {

  restaurantId: number = 0;
  reviews: any[] = [];
  userCheckIns: any[] = [];
  userReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private checkInService: CheckInService) {
    this.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  ngOnInit(): void {
    this.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.checkInService.getUserCheckInsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.userCheckIns = response;
        }
      });

    this.reviewService.getReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.reviews = response;
        }
      });

    this.reviewService.getUserReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.userReviews = response;
        }
      });
  }

  onDeleteReview(id: any): void {
    this.reviewService.deleteReview(id)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      })
  }

  onDeleteCheckIn(id: any): void {
    this.checkInService.deleteCheckIn(id)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      })
  }
}
