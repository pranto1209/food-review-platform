import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';
import { CheckInService } from '../../check-in/services/check-in.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {

  user: any;
  restaurantId: number = 0;
  reviews: any[] = [];
  userCheckIns: any[] = [];
  userReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService,
    private checkInService: CheckInService) {
    this.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  ngOnInit(): void {
    this.onAuthUser();
    
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

  onAuthUser(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();
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
