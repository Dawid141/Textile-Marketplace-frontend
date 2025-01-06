import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private router: Router) { }

  getAuthHeaders() {
    let token = localStorage.getItem("jwtToken")
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  logOut() {
    localStorage.removeItem("jwtToken");
    this.router.navigate(["/products"]);
  }
}
