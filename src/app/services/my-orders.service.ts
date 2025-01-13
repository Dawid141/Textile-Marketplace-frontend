import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {Observable, take, tap} from 'rxjs';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.baseUrl = `${this.configService.getUrl()}:8080/api/v1/orders`;
  }

  getMyOrders(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get(`${this.baseUrl}/get-user-orders`, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }
}
