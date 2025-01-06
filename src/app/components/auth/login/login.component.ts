import { Component } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginRequest} from '../../../models/interface/loginRequest';
import {catchError, tap, throwError} from 'rxjs';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {LoginResponse} from '../../../models/interface/loginResponse';

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

  constructor(public authService: AuthService, private router: Router) {}

  onSubmit() {
    const formData: LoginRequest = this.loginForm.value as LoginRequest;
    console.log(formData);
    this.authService.login(formData).pipe(
      tap((response: LoginResponse) => {
        localStorage.setItem("jwtToken", response.token);
        console.log("Login successful. Token saved.");
      }),
      catchError((error) => {
        console.error("Login failed:", error);
        alert("Login failed. Please check your credentials.");
        return throwError(() => error);
      })
    ).subscribe({
      next: () => {
        console.log("Navigating to dashboard...");
        this.router.navigate(["/products"]);
      },
      error: () => {
      }
    });
  }
}
