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


  getListingById(id: string): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get(`http://localhost:8080/api/v1/products/${id}`, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }

  getAllProducts(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get('http://localhost:8080/api/v1/products/get_all', {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }

  getListingEnums(): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.get("http://localhost:8080/api/v1/products/get-listing-enums", {headers, observe: "body", responseType: "json"})
  }

  publishProduct(product: ListingDTO): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.post("http://localhost:8080/api/v1/products/add", product, {headers, observe: "body", responseType: "json"})
  }
}
