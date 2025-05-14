import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent {

  restaurantId: number = 0;
  reviews: any[] = [];
  userReview: any = null;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.reviewService.getReviewsByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.reviews = response;
        }
      });

    this.reviewService.getUserReviewByRestaurant(this.restaurantId)
      .subscribe({
        next: (response) => {
          this.userReview = response;
        }
      });
  }

  onDelete(): void {
    this.reviewService.deleteReview(this.userReview.id)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      })
  }
}
