import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { CheckInService } from '../../check-in/services/check-in.service';
import { AuthService } from '../../auth/services/auth.service';
import { AddCheckInRequest } from '../../check-in/models/add-check-in-request.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {

  restaurantId: number = 0;

  user: any;
  userCheckIns: any[] = [];
  userReviews: any[] = [];
  reviews: any[] = [];
  averageRating: number = 0;

  model: AddCheckInRequest = {
    restaurantId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService,
    private checkInService: CheckInService) {
  }

  ngOnInit(): void {
    this.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.model.restaurantId = this.restaurantId;

    this.onAuthUser();

    this.onUserCheckIn();

    this.onUserReview();

    this.onReview();

    this.onAverageRating();
  }

  onAuthUser(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();
  }

  onUserCheckIn(): void {
    this.checkInService.getUserCheckInsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.userCheckIns = response;
        }
      });
  }

  onUserReview(): void {
    this.reviewService.getUserReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.userReviews = response;
        }
      });
  }

  addCheckIn(): void {
    this.checkInService.addCheckIn(this.model)
      .subscribe({
        next: (response) => {
          this.onUserCheckIn();
        },
        error: (err) => {
          alert('You have already checked in this restaurant today');
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

  onReview(): void {
    this.reviewService.getReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.reviews = response;
        }
      });
  }

  onAverageRating(): void {
    this.reviewService.getAverageRatingByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.averageRating = response;
        }
      });
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
