import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private url = "http://localhost:8080/api/v1/image";

  constructor(private http: HttpClient, private jwtService: JwtService) { }

  uploadImage(formData: FormData): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.put(`${this.url}/upload`, formData, {observe: "body", headers, withCredentials: true});
  }

  deleteImage(fileName: string): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.delete(`${this.url}/delete?filename=${fileName}`, {observe: "body", headers, withCredentials: true})
  }

  deleteAllImages(fileNames: string[]) {
    let headers = this.jwtService.getAuthHeaders();
    const query = fileNames.map(name => `filename=${encodeURIComponent(name)}`).join('&');
    return this.http.delete(`${this.url}/delete?${query}`, {observe: "body", headers, withCredentials: true})
  }
}
