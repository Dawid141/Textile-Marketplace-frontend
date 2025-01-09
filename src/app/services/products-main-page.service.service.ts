import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsMainPageService {

  constructor(private http: HttpClient, private jwtService: JwtService) {}


}
