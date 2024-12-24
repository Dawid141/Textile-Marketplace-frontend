import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {

  constructor(private http: HttpClient) {}

  private url: string = 'http://localhost:8080/api/v1/user/get';

  getUserByData(token?: string | null): Observable<any> {
    const apiUrl = `${this.url}`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return this.http.get(apiUrl, { headers: headers });
  }
}
