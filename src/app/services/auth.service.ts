import { Injectable } from '@angular/core';
import {RegisterRequest} from '../models/interfaces/auth/registerRequest';
import {LoginRequest} from '../models/interfaces/auth/loginRequest';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, take, tap} from 'rxjs';
import {JwtService} from './jwt-service.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.configService.ip$.pipe(
      tap(ip => {
        if (ip) {
          this.baseUrl = `${ip}:8080/api/v1/auth`;
          console.log(this.baseUrl);
        } else {
          console.error('IP address is null or undefined');
        }
      })
    ).subscribe();
  }

  login(formData: LoginRequest): Observable<any> {
    let url = `${this.baseUrl}/authenticate`
    return this.http.post(url, formData, {observe: "body"})
  }

  register(formData: RegisterRequest): Observable<any> {
    let url = `${this.baseUrl}/register`
    return this.http.post(url, formData, {observe: "body"})
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    let url = `${this.baseUrl}/send_reset_password_email`;
    const formData = {email: email};
    return this.http.post(url, formData, {observe: "body"})
  }

  validatePasswordResetToken(token: string): Observable<any> {
    let url = `${this.baseUrl}/validate-password-token`;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(url, null, { headers, observe: 'body' });
  }

  resetPassword(password: string, token: string): Observable<any> {
    let url = `${this.baseUrl}/reset_password`;
    const formData = {new_password: password};
    return this.http.post(url, formData, {headers: new HttpHeaders({ 'Authorization': "Bearer " + token }), observe: "body"})
  }

  activateAccount(token: string): Observable<any> {
    let url = `${this.baseUrl}/activate_account`;
    let headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(url, null, { headers, observe: 'body' });
  }
}
