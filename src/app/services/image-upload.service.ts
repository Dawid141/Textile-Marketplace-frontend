import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private url = "http://localhost:8080/api/v1/image/upload";

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  uploadImage(formData: FormData): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.put(this.url, formData, {observe: "body", headers, withCredentials: true});
  }
}
