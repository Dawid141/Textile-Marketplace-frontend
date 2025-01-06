import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getAllProducts() {
    return this.http.get("http://localhost:8080/api/v1/auth/offers");
  }

  getListingEnums(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    console.log(headers)
    return this.http.get("http://localhost:8080/api/v1/listings/get-listing-enums", {headers, observe: "body", responseType: "json"})
  }
}
