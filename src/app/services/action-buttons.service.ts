import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActionButtonsService {

  private baseUrl = 'http://localhost:8080/api/v1/orders';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  acceptOrder(orderId: number): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    const url = `${this.baseUrl}/${orderId}/accept`;

    return this.http.patch(url, {}, {
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    });
  }

  rejectOrder(orderId: number): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    const url = `${this.baseUrl}/${orderId}/reject`;

    return this.http.put(url, {}, {
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    });
  }

  changeOrderPrice(orderId: number, newPrice: number): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    const url = `${this.baseUrl}/${orderId}/change-price`;

    return this.http.patch(url, newPrice, {
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    });
  }
}
