import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-user-review-list',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './user-review-list.component.html',
  styleUrl: './user-review-list.component.scss'
})
export class UserReviewListComponent {

  userReviews: any[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.onReview();
  }

  onReview(): void {
    this.reviewService.getReviewsByUser()
      .subscribe({
        next: (response) => {
          this.userReviews = response.data;
        }
      });
  }

  onDelete(id: any): void {
    this.reviewService.deleteReview(id)
      .subscribe({
        next: (response) => {
          this.onReview();
        }
      })
  }
}
