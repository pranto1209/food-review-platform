import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { UpdateReviewRequest } from '../../models/update-review.request';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-review',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.scss'
})
export class EditReviewComponent implements OnInit {

  reviewId: number = 0;
  userReview: any;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private location: Location,
    private router: Router) {
  }

  ngOnInit(): void {
    this.reviewId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.reviewService.getReviewById(this.reviewId)
      .subscribe({
        next: (response) => {
          this.userReview = response;
        }
      });
  }

  onFormSubmit(): void {
    const updateUserReviewRequest: UpdateReviewRequest = {
      id: this.reviewId,
      rating: this.userReview.rating,
      comment: this.userReview.comment ?? ''
    };

    this.reviewService.updateReview(updateUserReviewRequest)
      .subscribe({
        next: (response) => {
          this.location.back();
        }
      });
  }
}
