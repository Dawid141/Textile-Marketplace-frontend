import { Injectable } from '@angular/core';
import {Observable, take, tap} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt-service.service';
import {ConfigService} from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private baseUrl: string | undefined;

  constructor(private http: HttpClient, private jwtService: JwtService, private configService: ConfigService) {
    this.configService.ip$.pipe(
      tap(ip => {
        if (ip) {
          this.baseUrl = `${ip}:8080/api/v1/image`
        }
      })).subscribe();
  }

  uploadImage(formData: FormData): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.put(`${this.baseUrl}/upload`, formData, {observe: "body", headers, withCredentials: true});
  }

  deleteImage(fileName: string): Observable<any> {
    let headers = this.jwtService.getAuthHeaders();
    return this.http.delete(`${this.baseUrl}/delete?filename=${fileName}`, {observe: "body", headers, withCredentials: true})
  }

  deleteAllImages(fileNames: string[]) {
    let headers = this.jwtService.getAuthHeaders();
    const query = fileNames.map(name => `filename=${encodeURIComponent(name)}`).join('&');
    return this.http.delete(`${this.baseUrl}/delete?${query}`, {observe: "body", headers, withCredentials: true})
  }
}
