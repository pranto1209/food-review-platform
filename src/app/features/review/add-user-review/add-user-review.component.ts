import { Component, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { AddUserReviewRequest } from '../models/add-user-review-request.model';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-add-user-review',
  templateUrl: './add-user-review.component.html',
  styleUrls: ['./add-user-review.component.css']
})
export class AddUserReviewComponent {

  model: AddUserReviewRequest;

  constructor(private reviewService: ReviewService,
    private router: Router) {
    this.model = {
      rating: 0,
      comment: '',
      restaurantId: 0
    };
  }


  onFormSubmit() {
    this.reviewService.addUserReview(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/user-review');
        }
      })
  }
}
