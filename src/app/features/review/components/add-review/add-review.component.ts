import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { AddReviewRequest } from '../../models/add-review.request';

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
    private activatedRoute: ActivatedRoute,
    private reviewService: ReviewService
  ) { }

  ngOnInit() {
    this.model.restaurantId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
    this.reviewService.addReview(this.model).subscribe({
      next: (response) => {
        window.history.back();
      }
    });
  }
}
