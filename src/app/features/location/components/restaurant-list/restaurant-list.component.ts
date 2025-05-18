import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';

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
    private route: ActivatedRoute,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.onRestaurant();
  }

  onRestaurant(): void {
    this.locationService.getRestaurantsByLocation(this.locationId, this.request)
      .subscribe({
        next: (response) => {
          this.restaurants = response.data;
          this.totalPage = Math.ceil(response.total / this.request.pageSize);
        }
      });
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