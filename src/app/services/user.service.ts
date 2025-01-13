import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, take, tap} from 'rxjs';
import {JwtService} from './jwt-service.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.configService.ip$.pipe(
      tap(ip => {
        if (ip) {
          this.baseUrl = `${ip}:8080/api/v1/user`
        }
      })).subscribe();
  }

  getUserData(): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.get(`${this.baseUrl}/get`, {observe: "body", responseType: "json", headers, withCredentials: true});
  }
}
