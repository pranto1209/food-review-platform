import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { FilteringRequest } from '../../../../shared/models/filtering.request';
import { AuthService } from '../../../auth/services/auth.service';
import { PaginationComponent } from "../../../../shared/components/pagination/pagination.component";
import { User } from '../../../../shared/models/user';
import { UserRoleEnum } from '../../../../shared/models/user-role.enum';

@Component({
  selector: 'app-location-list',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    PaginationComponent
  ],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent implements OnInit {

  user?: User;
  userRole = UserRoleEnum;
  locations: any;

  totalPage: number = 0;

  request: FilteringRequest = {
    searchText: '',
    isPaginated: true,
    pageNumber: 1,
    pageSize: 10
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.onAuthUser();

    this.onLocation();
  }

  onAuthUser(): void {
    this.authService.user().subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  onLocation(): void {
    this.locationService.getLocations(this.request).subscribe({
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

  goToViewRestaurant(locationId: number) {
    this.router.navigate(['/restaurant'],
      {
        queryParams: { id: locationId }
      });
  }

  goToAddLocation() {
    this.router.navigate(['/location/add']);
  }

  goToEditLocation(locationId: number) {
    this.router.navigate(['/location/edit'],
      {
        queryParams: { id: locationId }
      });
  }

  onDeleteLocation(id: any): void {
    this.locationService.deleteLocation(id).subscribe({
      next: (response) => {
        this.onLocation();
      }
    });
  }

  getPage(pageNumber: any): void {
    this.request.pageNumber = pageNumber;
    this.onLocation();
  }
}
