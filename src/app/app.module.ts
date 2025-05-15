import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RegisterComponent } from './features/auth/register/register.component';
import { LocationListComponent } from './features/location/location-list/location-list.component';
import { RestaurantListComponent } from './features/location/restaurant-list/restaurant-list.component';
import { ReviewListComponent } from './features/review/review-list/review-list.component';
import { AddReviewComponent } from './features/review/add-review/add-review.component';
import { EditReviewComponent } from './features/review/edit-review/edit-review.component';
import { UserReviewListComponent } from './features/review/user-review-list/user-review-list.component';
import { UserCheckInListComponent } from './features/check-in/user-check-in-list/user-check-in-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LocationListComponent,
    RestaurantListComponent,
    ReviewListComponent,
    AddReviewComponent,
    EditReviewComponent,
    UserReviewListComponent,
    UserCheckInListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
