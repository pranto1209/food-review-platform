import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getReviewsByRestaurant(id: any, request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/Review/get-reviews-by-restaurant?id=${id}`, { params });
  }

  getAverageRatingByRestaurant(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Review/get-average-rating-by-restaurant?id=${id}`);
  }

  getUserReviewsByRestaurant(id: any, request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/Review/get-user-reviews-by-restaurant?id=${id}`, { params });
  }

  getReviewById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Review/get-review-by-id?id=${id}`);
  }

  getReviewsByUser(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);
      
    return this.http.get<any>(`${environment.apiBaseUrl}/Review/get-reviews-by-user`, { params });
  }

  addReview(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/Review/add-review`, model);
  }

  editReview(model: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/Review/edit-review`, model);
  }

  deleteReview(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/Review/delete-review/${id}`)
  }
}
