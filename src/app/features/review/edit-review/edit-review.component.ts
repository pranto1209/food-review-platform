import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UpdateReviewRequest } from '../models/update-review-request.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
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
