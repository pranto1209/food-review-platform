import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { LocationListComponent } from './features/location/location-list/location-list.component';
import { RestaurantListComponent } from './features/location/restaurant-list/restaurant-list.component';
import { ReviewListComponent } from './features/review/review-list/review-list.component';
import { AddReviewComponent } from './features/review/add-review/add-review.component';
import { EditReviewComponent } from './features/review/edit-review/edit-review.component';
import { UserReviewListComponent } from './features/review/user-review-list/user-review-list.component';
import { UserCheckInListComponent } from './features/check-in/user-check-in-list/user-check-in-list.component';
import { AddCheckInComponent } from './features/check-in/add-check-in/add-check-in.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  
  {
    path: '',
    component: LocationListComponent
  },
  {
    path: 'restaurant',
    component: RestaurantListComponent
  },
  {
    path: 'review',
    component: ReviewListComponent
  },
  {
    path: 'user-review',
    component: UserReviewListComponent
  },
  {
    path: 'review/add',
    component: AddReviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'review/edit',
    component: EditReviewComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-check-in',
    component: UserCheckInListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'check-in/add',
    component: AddCheckInComponent,
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
