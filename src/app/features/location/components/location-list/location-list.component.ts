import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';

@Component({
  selector: 'app-location-list',
  imports: [
    CommonModule,
    RouterModule,
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent {

  locations: any;

  totalPage: any;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  }

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.onLocation();
  }

  onLocation(): void {
    this.locationService.getLocations(this.request)
      .subscribe({
        next: (response) => {
          this.locations = response.data;
          this.totalPage = Math.ceil(response.total / this.request.pageSize);
        }
      });
  }

  onSearch(queryText: any): void {
    this.request.searchText = queryText;
    this.onLocation();
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onLocation();
  }

  getNextPage(): void {
    if (this.request.pageNumber < this.totalPage) {
      this.request.pageNumber += 1;
    }
    this.onLocation();
  }

  getPrevPage(): void {
    if (this.request.pageNumber > 1) {
      this.request.pageNumber -= 1;
    }
    this.onLocation();
  }
}
