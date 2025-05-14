import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddReviewRequest } from '../models/add-review-request.model';
import { ReviewService } from '../services/review.service';
// import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    ) {
  }

  ngOnInit() {
    this.model.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
  this.reviewService.addReview(this.model)
    .subscribe({
      next: (response) => {
        // this.toastr.success('Review added successfully!');
        this.router.navigateByUrl('/review');
      },
      error: (err) => {
        // this.toastr.error('Failed to add review. Please try again.');
      }
    });
}
}
