import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-user-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {
  
  userReviews: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {

    this.reviewService.getReviewsByUser()
      .subscribe({
        next: (response) => {
          this.userReviews = response;
        }
      });
  }

  onDelete(id: any): void {
    this.reviewService.deleteReview(id)
      .subscribe({
        next: (response) => {
          this.ngOnInit();
        }
      })
  }
}
