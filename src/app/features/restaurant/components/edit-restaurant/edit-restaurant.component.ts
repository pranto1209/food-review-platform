import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { UpdateRestaurantRequest } from '../../models/update-restaurant.request';

@Component({
  selector: 'app-edit-restaurant',
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.scss'
})
export class EditRestaurantComponent implements OnInit {

  restaurantId: number = 0;
  restaurant: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restaurantService: RestaurantService
  ) { }

  ngOnInit(): void {
    this.restaurantId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('id') ?? '0');

    this.restaurantService.getRestaurantById(this.restaurantId).subscribe({
      next: (response) => {
        this.restaurant = response;
      }
    });
  }

  onFormSubmit(): void {
    const model: UpdateRestaurantRequest = {
      id: this.restaurantId,
      name: this.restaurant.name
    };

    this.restaurantService.updateRestaurant(model).subscribe({
      next: (response) => {
        window.history.back();
      }
    });
  }
}
