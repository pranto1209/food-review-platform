import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsByRestaurant(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Review/get-reviews-by-restaurant?id=${id}`);
  }

  getAverageRatingByRestaurant(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Review/get-average-rating-by-restaurant?id=${id}`);
  }

  getUserReviewsByRestaurant(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Review/get-user-reviews-by-restaurant?id=${id}`);
  }

  getReviewById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Review/get-review-by-id?id=${id}`);
  }

  getReviewsByUser(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Review/get-reviews-by-user`);
  }

  addReview(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/Review/add-review`, model);
  }

  updateReview(model: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/Review/update-review`, model);
  }

  deleteReview(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Review/delete-review/${id}`)
  }
}
