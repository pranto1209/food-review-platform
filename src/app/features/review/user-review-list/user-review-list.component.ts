import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-review-list',
  templateUrl: './user-review-list.component.html',
  styleUrls: ['./user-review-list.component.css']
})
export class UserReviewListComponent {

  reviews: any[] = [];

  constructor(
    private reviewService: ReviewService) {
  }

  ngOnInit(): void {
    this.reviewService.getReviewsByUser()
      .subscribe({
        next: (response) => {
          this.reviews = response;
        }
      });
  }
}
