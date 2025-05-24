import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { ReviewService } from '../../services/review.service';
import { UserCheckInListComponent } from "../../../check-in/components/user-check-in-list/user-check-in-list.component";
import { User } from '../../../../shared/models/user';
import { UserReviewListComponent } from "../user-review-list/user-review-list.component";
import { FilteringRequest } from '../../../../shared/models/filtering.request';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { UserRoleEnum } from '../../../../shared/models/user-role.enum';

@Component({
  selector: 'app-review-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    UserCheckInListComponent,
    UserReviewListComponent,
    PaginationComponent
  ],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss'
})
export class ReviewListComponent implements OnInit {

  restaurantId: number = 0;
  user?: User;
  userRole = UserRoleEnum;
  reviews: any[] = [];
  averageRating: number = 0;

  totalPage: number = 0;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private reviewService: ReviewService
  ) { }

  ngOnInit(): void {
    this.restaurantId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');

    this.onAuthUser();

    this.onReview();

    this.onAverageRating();
  }

  onAuthUser(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  onReview(): void {
    this.reviewService.getReviewsByRestaurant(this.restaurantId, this.request).subscribe({
      next: (response) => {
        this.reviews = response.data;
        this.totalPage = Math.ceil(response.total / this.request.pageSize);
      }
    });
  }

  onAverageRating(): void {
    this.reviewService.getAverageRatingByRestaurant(this.restaurantId).subscribe({
      next: (response) => {
        this.averageRating = response;
      }
    });
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.ngOnInit();
  }
}
