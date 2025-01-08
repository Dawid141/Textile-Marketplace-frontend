import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsMainPageService {

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getAllListings(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get('http://localhost:8080/api/v1/listings/get_all', {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }
}
