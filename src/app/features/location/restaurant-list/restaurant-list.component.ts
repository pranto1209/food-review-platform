import { Component } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent {

  id: number = 0;
  restaurants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.id = parseInt(params.get('id') ?? '0');

        if (this.id) {
          this.locationService.getRestaurantsByLocation(this.id)
          .subscribe({
            next: (response) => {
              this.restaurants = response;
            }
          });
        }
      }
    });
  }
}
