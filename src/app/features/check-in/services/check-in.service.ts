import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { FilteringRequest } from '../../../shared/models/filtering.request';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  constructor(private http: HttpClient) { }

  getUserCheckInsByRestaurant(id: any, request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/CheckIn/get-user-check-ins-by-restaurant?id=${id}`, { params });
  }

  getCheckInsByUser(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);
      
    return this.http.get<any>(`${environment.apiBaseUrl}/api/CheckIn/get-check-ins-by-user`, { params });
  }

  addCheckIn(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/CheckIn/add-check-in`, model);
  }
  
  deleteCheckIn(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/CheckIn/delete-check-in/${id}`)
  }
}
