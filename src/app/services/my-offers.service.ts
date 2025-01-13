import { Injectable } from '@angular/core';
import {Observable, take, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MyOffersService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.baseUrl = `${this.configService.getUrl()}:8080/api/v1/products`;
  }

  getMyOffers(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get(`${this.baseUrl}/get-user-products`, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }
}
