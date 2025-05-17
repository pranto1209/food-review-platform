import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';

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
