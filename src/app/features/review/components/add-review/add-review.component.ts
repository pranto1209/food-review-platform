import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AddReviewRequest } from '../../models/add-review.request';
import { ReviewService } from '../../services/review.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.scss'
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
    private location: Location) {
  }

  ngOnInit() {
    this.model.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
    this.reviewService.addReview(this.model)
      .subscribe({
        next: (response) => {
          this.location.back();
        }
      });
  }
}
