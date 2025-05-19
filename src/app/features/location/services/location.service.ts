import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilteringRequest } from '../../../shared/models/filtering.request';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(request: FilteringRequest): Observable<any> {
    let params = new HttpParams()
      .set('searchText', request.searchText)
      .set('isPaginated', request.isPaginated)
      .set('pageNumber', request.pageNumber)
      .set('pageSize', request.pageSize);

    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-locations`, { params });
  }

  getLocationById(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-location-by-id?id=${id}`);
  }

  addLocation(model: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/api/Location/add-location`, model);
  }

  updateLocation(model: any): Observable<any> {
    return this.http.put<any>(`${environment.apiBaseUrl}/api/Location/update-location`, model);
  }

  deleteLocation(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiBaseUrl}/api/Location/delete-location/${id}`)
  }
}
