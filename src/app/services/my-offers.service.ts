import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class MyOffersService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getMyOffers(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get('http://localhost:8080/api/v1/products/get-user-products', {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }
}
