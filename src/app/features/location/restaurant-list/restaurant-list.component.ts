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

  restaurants: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService) {
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');

    this.locationService.getRestaurantsByLocation(id)
      .subscribe({
        next: (response) => {
          this.restaurants = response;
        }
      });
  }
}
