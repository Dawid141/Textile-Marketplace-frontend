import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../../models/interfaces/auth/loginRequest';
import {catchError, tap, throwError} from 'rxjs';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {LoginResponse} from '../../../models/interfaces/auth/loginResponse';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    MatButton
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(public authService: AuthService, private router: Router, private _snackBar: MatSnackBar) {}

  onSubmit() {
    const formData: LoginRequest = this.loginForm.value as LoginRequest;
    console.log(formData);
    this.authService.login(formData).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem("jwtToken", response.token);
        console.log("Login successful. Token saved.");
        console.log("Navigating to dashboard...");
        this.router.navigate(["/products"]);
      }),
      catchError((error) => {
        console.error("Login failed:", error);
        this._snackBar.open("Login failed. Please check your credentials.", "Ok");
        return throwError(() => error);
      })
    ).subscribe();
  }
}
