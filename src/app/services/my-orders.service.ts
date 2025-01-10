import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }


  getMyOrders(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get('http://localhost:8080/api/v1/orders/get-user-orders', {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }
}
