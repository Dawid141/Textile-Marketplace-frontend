import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {Observable} from 'rxjs';
import {ListingDTO} from '../models/interface/ListingDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  getAllProducts() {
    return this.http.get("http://localhost:8080/api/v1/auth/offers");
  }

  getListingEnums(): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.get("http://localhost:8080/api/v1/listings/get-listing-enums", {headers, observe: "body", responseType: "json"})
  }

  publishProduct(product: ListingDTO): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.post("http://localhost:8080/api/v1/listings/add", product, {headers, observe: "body", responseType: "json"})
  }
}
