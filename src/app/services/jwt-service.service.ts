import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) { }

  getAuthHeaders() {
    return new HttpHeaders({ 'Authorization': "Bearer " + String(localStorage.getItem("jwtToken")) });
  }

  logOut() {
    localStorage.removeItem("jwtToken");
    this.router.navigate(["/"]);
  }
}
