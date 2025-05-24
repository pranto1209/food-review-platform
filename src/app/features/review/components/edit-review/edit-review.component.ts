import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { UpdateReviewRequest } from '../../models/update-review.request';

@Component({
  selector: 'app-edit-review',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './edit-review.component.html',
  styleUrl: './edit-review.component.scss'
})
export class EditReviewComponent implements OnInit {

  reviewId: number = 0;
  userReview: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.reviewId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');

    this.reviewService.getReviewById(this.reviewId).subscribe({
      next: (response) => {
        this.userReview = response;
      }
    });
  }

  onFormSubmit(): void {
    const model: UpdateReviewRequest = {
      id: this.reviewId,
      rating: this.userReview.rating,
      comment: this.userReview.comment ?? ''
    };

    this.reviewService.updateReview(model).subscribe({
      next: (response) => {
        window.history.back();
      }
    });
  }
}
