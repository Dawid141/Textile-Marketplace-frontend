import {inject, Injectable} from '@angular/core';
import {Router, CanActivateFn} from '@angular/router';
import {jwtDecode} from "jwt-decode";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
class LoginGuard {
  constructor(public router: Router, private _snackBar: MatSnackBar) {}

  canActivate(): boolean {
    if (!localStorage.getItem("jwtToken") || this.isJWTExpired()) {
      this.router.navigate(['/login']);
      this._snackBar.open("You need to be logged in to view this page", "Ok")
      return false;
    }
    return true;
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

export const IsLoginGuard: CanActivateFn = ():boolean => {
  return inject(LoginGuard).canActivate();
}
