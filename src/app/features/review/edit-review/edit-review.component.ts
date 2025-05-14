import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateReviewRequest } from '../models/update-review-request.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.css']
})
export class EditReviewComponent implements OnInit {

  id: number = 0;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  review?: any;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.reviewService.getReviewById(this.id)
      .subscribe({
        next: (response) => {
          this.review = response;
        }
      });
  }

  onFormSubmit(): void {
    const updateUserReviewRequest: UpdateReviewRequest = {
      name: this.review?.name ?? '',
      urlHandle: this.review?.urlHandle ?? ''
    };

    if (this.id) {
      this.editCategorySubscription = this.reviewService.updateReview(this.id, updateUserReviewRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/user-review');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.reviewService.deleteReview(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/user-review');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
