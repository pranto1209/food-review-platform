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

  paginationList: number[] = [];

  searchText: string = '';
  isPaginated = true;
  pageNumber = 1;
  pageSize = 5;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locationService.getLocations(this.searchText, this.isPaginated, this.pageNumber, this.pageSize)
      .subscribe({
        next: (response) => {
          this.locations = response.data;
          this.paginationList = new Array(Math.ceil(response.total / this.pageSize));
        }
      });
  }

  onSearch(queryText: string) {
    this.searchText = queryText;
    this.ngOnInit();
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.ngOnInit();
  }

  getNextPage() {
    if (this.pageNumber + 1 > this.paginationList.length) {
      return;
    }
    this.pageNumber += 1;
    this.ngOnInit();
  }

  getPrevPage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1;
    this.ngOnInit();
  }
}
