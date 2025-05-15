import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AddCheckInRequest } from '../models/add-check-in-request.model';
import { ToastrService } from 'ngx-toastr';
import { CheckInService } from '../services/check-in.service';

@Component({
  selector: 'app-add-check-in',
  templateUrl: './add-check-in.component.html',
  styleUrls: ['./add-check-in.component.css']
})
export class AddCheckInComponent implements OnInit {

  model: AddCheckInRequest = {
    restaurantId: 0
  };

  constructor(
    private route: ActivatedRoute,
    private checkInService: CheckInService,
    private location: Location,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.model.restaurantId = parseInt(this.route.snapshot.queryParamMap.get('id') ?? '0');
  }

  onFormSubmit() {
    this.checkInService.addCheckIn(this.model)
      .subscribe({
        next: (response) => {
          this.location.back();
        },
        error: (err) => {
          alert('You have already checked in this restaurant today');
          this.location.back();
        }
      });
  }
}
