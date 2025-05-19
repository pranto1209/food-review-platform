import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { LocationListComponent } from './features/location/components/location-list/location-list.component';
import { RestaurantListComponent } from './features/restaurant/components/restaurant-list/restaurant-list.component';
import { ReviewListComponent } from './features/review/components/review-list/review-list.component';
import { UserCheckInListComponent } from './features/check-in/components/user-check-in-list/user-check-in-list.component';
import { UserReviewListComponent } from './features/review/components/user-review-list/user-review-list.component';
import { AddReviewComponent } from './features/review/components/add-review/add-review.component';
import { EditReviewComponent } from './features/review/components/edit-review/edit-review.component';
import { authGuard } from './core/guards/auth.guard';
import { AddRestaurantComponent } from './features/restaurant/components/add-restaurant/add-restaurant.component';
import { AddLocationComponent } from './features/location/components/add-location/add-location.component';

export const routes: Routes = [
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
        path: 'location/add',
        component: AddLocationComponent
    },
    {
        path: 'location/edit',
        component: AddLocationComponent
    },
    {
        path: 'restaurant',
        component: RestaurantListComponent
    },
    {
        path: 'restaurant/add',
        component: AddRestaurantComponent
    },
    {
        path: 'restaurant/edit',
        component: AddRestaurantComponent
    },
    {
        path: 'review',
        component: ReviewListComponent
    },
    {
        path: 'user-review',
        component: UserReviewListComponent,
        canActivate: [authGuard]
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
];
