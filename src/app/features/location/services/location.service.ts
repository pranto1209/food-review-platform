import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-locations`);
  }

  getRestaurantsByLocation(id: any): Observable<any> {
    return this.http.get<any>(`${environment.apiBaseUrl}/api/Location/get-restaurants-by-location/${id}`);
  }
}
