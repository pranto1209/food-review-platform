import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UpdateUserReviewRequest } from '../models/update-user-review-request.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-edit-user-review',
  templateUrl: './edit-user-review.component.html',
  styleUrls: ['./edit-user-review.component.css']
})
export class EditUserReviewComponent implements OnInit, OnDestroy {

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
    const updateUserReviewRequest: UpdateUserReviewRequest = {
      name: this.review?.name ?? '',
      urlHandle: this.review?.urlHandle ?? ''
    };

    if (this.id) {
      this.editCategorySubscription = this.reviewService.updateUserReview(this.id, updateUserReviewRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/user-review');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.reviewService.deleteUserReview(this.id)
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
