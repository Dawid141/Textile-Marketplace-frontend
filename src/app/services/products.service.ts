import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {Observable, take, tap} from 'rxjs';
import {ListingDTO} from '../models/interfaces/product/ListingDTO';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl: string | undefined;

  constructor(private configService: ConfigService, private http: HttpClient, private jwtService: JwtService) {
    this.baseUrl = `${this.configService.getUrl()}:8080/api/v1`;
  }

  getListingById(id: string): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();

    return this.http.get(`${this.baseUrl}/products/${id}`, {
      observe: 'body',
      responseType: 'json',
      headers: headers,
      withCredentials: true
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/main-page-products/get_all`, {
      observe: 'body',
      responseType: 'json',
      withCredentials: true
    });
  }

  getListingEnums(): Observable<any> {
    return this.http.get(`${this.baseUrl}/main-page-products/get-listing-enums`, {observe: "body", responseType: "json"})
  }

  publishProduct(product: ListingDTO): Observable<any> {
    const headers = this.jwtService.getAuthHeaders();
    return this.http.post(`${this.baseUrl}/products/add`, product, {headers, observe: "body", responseType: "json"})
  }

  formatEnum(formEnum: string) {
    return formEnum
      .toLowerCase()
      .split("_")
      .map((word, index, arr) => {
        // Check if the word is a Roman numeral (appears after "class")
        if (
          index === arr.length - 1 && // Last word in the array
          /^i{1,3}|iv|v$/i.test(word) // Matches Roman numerals I, II, III, IV, or V
        ) {
          return word.toUpperCase(); // Keep Roman numerals uppercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize other words
      })
      .join(" ");
  }
}
