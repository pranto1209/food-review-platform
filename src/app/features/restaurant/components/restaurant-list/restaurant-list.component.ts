import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-restaurant-list',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.scss'
})
export class RestaurantListComponent {

  user: any
  locationId: number = 0;
  restaurants: any[] = [];

  totalPage: any;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.locationId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');

    this.onAuthUser();

    this.onRestaurant();
  }

  onAuthUser(): void {
    this.authService.user().subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();
  }

  onRestaurant(): void {
    this.restaurantService.getRestaurantsByLocation(this.locationId, this.request)
      .subscribe({
        next: (response) => {
          this.restaurants = response.data;
          this.totalPage = Math.ceil(response.total / this.request.pageSize);
        }
      });
  }

  goToViewReview(restaurantId: number) {
    this.router.navigate(['/review'], { queryParams: { id: restaurantId } });
  }

  goToAddRestaurant() {
    this.router.navigate(['/restaurant/add'],
      {
        queryParams: { id: this.locationId }
      });
  }

  goToEditRestaurant(restaurantId: number) {
    this.router.navigate(['/restaurant/edit'],
      {
        queryParams: { id: restaurantId }
      });
  }

  onDeleteRestaurant(id: any): void {
    this.restaurantService.deleteRestaurant(id)
      .subscribe({
        next: (response) => {
          this.onRestaurant();
        }
      })
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onRestaurant();
  }

  getNextPage(): void {
    if (this.request.pageNumber < this.totalPage) {
      this.request.pageNumber += 1;
    }
    this.onRestaurant();
  }

  getPrevPage(): void {
    if (this.request.pageNumber > 1) {
      this.request.pageNumber -= 1;
    }
    this.onRestaurant();
  }
}