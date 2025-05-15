import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(
    searchText?: string,
    isPaginated?: boolean,
    pageNumber?: number,
    pageSize?: number
  ): Observable<any> {

    let params = new HttpParams();

    if (searchText) {
      params = params.set('searchText', searchText)
    }

    if (isPaginated) {
      params = params.set('isPaginated', isPaginated)
    }

    if (pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }

    if (pageSize) {
      params = params.set('pageSize', pageSize)
    }

    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-locations`, { params });
  }

  getRestaurantsByLocation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-restaurants-by-location?id=${id}`);
  }
}
