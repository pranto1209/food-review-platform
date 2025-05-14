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
import { AddReviewComponent } from './features/review/add-review/add-review.component';
import { EditReviewComponent } from './features/review/edit-review/edit-review.component';

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
    path: 'review/add',
    component: AddReviewComponent,
    // canActivate: [authGuard]
  },
  {
    path: 'review/edit',
    component: EditReviewComponent,
    // canActivate: [authGuard]
  },


  {
    path: 'blog/:url',
    component: BlogDetailsComponent
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
