import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { EditLocationRequest } from '../../models/edit-location.request';

@Component({
  selector: 'app-edit-location',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './edit-location.component.html',
  styleUrl: './edit-location.component.scss'
})
export class EditLocationComponent implements OnInit {

  locationId: number = 0;
  location: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private locationService: LocationService
  ) { }

  ngOnInit(): void {
    this.locationId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');

    this.locationService.getLocationById(this.locationId).subscribe({
      next: (response) => {
        this.location = response;
      }
    });
  }

  onFormSubmit(): void {
    const model: EditLocationRequest = {
      id: this.locationId,
      name: this.location.name,
      latitude: this.location.latitude,
      longitude: this.location.longitude
    };

    this.locationService.editLocation(model).subscribe({
      next: (response) => {
        window.history.back();
      }
    });
  }
}
