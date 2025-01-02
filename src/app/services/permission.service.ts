import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  isExpired(): boolean {
    return !localStorage.getItem("jwtToken") || this.isJWTExpired();
  }

  private isJWTExpired(): boolean {
    const decodedJwt = jwtDecode(localStorage.getItem("jwtToken")!).exp;
    if (decodedJwt) {
      const currentTime = new Date().getTime()/1000;
      return decodedJwt<currentTime;
    }
    return true;
  }
}
