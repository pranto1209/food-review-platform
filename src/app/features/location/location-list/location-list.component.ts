import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent {

  locations$?: Observable<any>;

  constructor(private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.locations$ = this.locationService.getLocations();
  }
}
