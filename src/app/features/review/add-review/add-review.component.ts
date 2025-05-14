import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewRequest } from '../models/add-review-request.model';
import { ReviewService } from '../services/review.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  model: AddReviewRequest = {
    rating: 5,
    comment: '',
    restaurantId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private location: Location,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.model.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
    this.reviewService.addReview(this.model)
      .subscribe({
        next: (response) => {
          this.location.back();
        },
        error: (err) => {
          this.toastr.error('You have already reviewed this location');
        }
      });
  }
}
