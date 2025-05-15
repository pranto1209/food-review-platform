import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {

  locations: any;
  totalCount?: number;
  list: number[] = [];
  pageNumber = 1;
  pageSize = 5;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getLocations(undefined, true, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.locations = response.data;
          this.totalCount = response.total;
          this.list = new Array(Math.ceil(response.total / this.pageSize))
        }
      });
  }

  onLocation() {
    this.locationService.getLocations(undefined, true, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.locations = response.data;
        }
      });
  }

  onSearch(searchText: string) {
    this.locationService.getLocations(searchText, true, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.locations = response.data;
        }
      });
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.onLocation();
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }
    this.pageNumber += 1;
    this.onLocation();
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;
    this.onLocation();
  }
}
