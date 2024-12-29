import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {catchError, of, tap} from 'rxjs';

@Component({
  selector: 'app-password-reset',
  imports: [
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './submit-password-reset.component.html',
  styleUrl: './submit-password-reset.component.css'
})
export class SubmitPasswordResetComponent {

  isSuccessful: boolean = false;
  passwordResetForm = new FormGroup({
    email: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService) {}

  onSubmit() {
    let email = this.passwordResetForm.controls['email'].value;
    if (!email) return;

    this.authService.sendResetPasswordEmail(email).pipe(tap(
      response => {
        console.log(response);
        this.isSuccessful = true;
      }),
      catchError(err => {
        console.log(err)
        // TODO unsuccessful popup or sth
        return of(null);
      }
    )).subscribe()
  }
}
