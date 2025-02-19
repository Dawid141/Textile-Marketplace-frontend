import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt-service.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ActionButtonsService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.baseUrl = `${this.configService.getUrl()}:8080/api/v1/orders`;
  }

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

  changeOrderPrice(orderId: number, newPrice: number, message: string): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    const url = `${this.baseUrl}/${orderId}/change-price`;

    const requestBody = {
      price: newPrice,
      message: message
    };

    return this.http.patch(url, requestBody, {
      headers: headers,
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    });
  }

}
