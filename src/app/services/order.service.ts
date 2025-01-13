import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, take, tap} from 'rxjs';
import {JwtService} from './jwt-service.service';
import {OrderCreationRequest} from '../models/interfaces/order/OrderCreationRequest';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.configService.ip$.pipe(
      tap(ip => {
        if (ip) {
          this.baseUrl = `${ip}:8080/api/v1/orders`
        }
      })).subscribe();
  }

  createOrderFromProduct(order: OrderCreationRequest): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/create`, order, {headers, observe: "body", withCredentials: true});
  }
}
