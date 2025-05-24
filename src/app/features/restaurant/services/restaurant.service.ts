import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurantsByLocation(id: any, request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/Restaurant/get-restaurants-by-location?id=${id}`, { params });
  }

  getRestaurantById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/Restaurant/get-restaurant-by-id?id=${id}`);
  }

  addRestaurant(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/Restaurant/add-restaurant`, model);
  }

  updateRestaurant(model: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/Restaurant/update-restaurant`, model);
  }

  deleteRestaurant(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/Restaurant/delete-restaurant/${id}`)
  }
}
