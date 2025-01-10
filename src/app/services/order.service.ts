import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from './jwt-service.service';
import {OrderDTO} from '../models/interface/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/api/v1/orders"

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  createOrderFromProduct(order: OrderDTO): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.post(`${this.url}/create`, order, {headers, observe: "body", withCredentials: true});
  }
}
