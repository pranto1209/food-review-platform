import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { LocationListComponent } from './features/location/location-list/location-list.component';
import { RestaurantListComponent } from './features/location/restaurant-list/restaurant-list.component';
import { ReviewListComponent } from './features/review/review-list/review-list.component';
import { UserReviewListComponent } from './features/review/user-review-list/user-review-list.component';
import { AddUserReviewComponent } from './features/review/add-user-review/add-user-review.component';
import { EditUserReviewComponent } from './features/review/edit-user-review/edit-user-review.component';

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
    path: 'user-review/add',
    component: AddUserReviewComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'user-review/edit',
    component: EditUserReviewComponent,
    // canActivate: [authGuard]
  },


  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path: 'user-review',
    component: UserReviewListComponent,
    // canActivate: [authGuard]
  },
  
  {
    path: 'check-in',
    component: BlogpostListComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'check-in/add',
    component: AddBlogpostComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'check-in/:id',
    component: EditBlogpostComponent,
    // canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
