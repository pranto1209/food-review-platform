import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationService } from '../../services/location.service';
import { AddLocationRequest } from '../../models/add-location.request';


@Component({
  selector: 'app-add-location',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss'
})
export class AddLocationComponent implements OnInit {

  model: AddLocationRequest = {
    area: '',
    latitude: 0.0,
    longitude: 0.0
  };

  constructor(private locationService: LocationService) { }

  ngOnInit() { }

  onFormSubmit() {
    this.locationService.addLocation(this.model)
      .subscribe({
        next: (response) => {
          window.history.back();
        }
      });
  }
}
