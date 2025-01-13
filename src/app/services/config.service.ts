import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import {IpConfig} from '../models/interfaces/Config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private ipSubject = new BehaviorSubject<string | null>(null);
  ip$ = this.ipSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get<IpConfig>('config.json', {observe: "body", responseType: "json"}).pipe(tap(config => {
        this.ipSubject.next(config.ip_address);
        console.log(config.ip_address)
      }),
      catchError(err => {
        console.log(err);
        return of(null);
      })
    )
  }
}
