import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {RegisterRequest} from '../../../models/interface/registerRequest';
import {NgIf} from '@angular/common';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {catchError, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatButton,
    MatInput,
    MatError,
    MatLabel
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    nip: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  });

  constructor(private router: Router, private authService: AuthService, private _snackbar: MatSnackBar) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      console.error("Invalid form submission");
      this._snackbar.open("Please fill in all required fields correctly.", "Ok");
      return;
    }

    const formData: RegisterRequest = this.registerForm.value as RegisterRequest;
    console.log(formData);

    this.authService.register(formData).pipe(
      tap(response => {
        console.log(response);
        this.router.navigate(['login'])
        this._snackbar.open("Registration successful. An account activation email has been sent.", "Ok")
      }),
      catchError(err => {
        console.log(err);
        this._snackbar.open(`Registration unsuccessful - ${err.message}`, "Ok");
        return of(null);
      })).subscribe();
  }
}
