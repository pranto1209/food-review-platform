import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { AddRestaurantRequest } from '../../models/add-restaurant.request';


@Component({
  selector: 'app-add-restaurant',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.scss'
})
export class AddRestaurantComponent implements OnInit {

  model: AddRestaurantRequest = {
    name: '',
    locationId: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit() {
    this.model.locationId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
    this.restaurantService.addRestaurant(this.model)
      .subscribe({
        next: (response) => {
          window.history.back();
        }
      });
  }
}
