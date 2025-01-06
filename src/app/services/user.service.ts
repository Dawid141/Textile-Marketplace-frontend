import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtService} from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getUserData(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.get("http://localhost:8080/api/v1/user/get", {observe: "body", responseType: "json", headers, withCredentials: true});
  }
}
