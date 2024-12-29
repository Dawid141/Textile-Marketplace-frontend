import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {catchError, filter, of, switchMap, tap} from 'rxjs';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-password-reset',
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.css'
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required])
  })
  token: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(filter(params => params['token']!=null && params['token']!=undefined),
      switchMap(params => this.authService.validatePasswordResetToken(params['token']).pipe(
        tap(response => {
          this.token = params['token'];
          console.log(response)
        })
      )),
      catchError(err => {
        console.log(err);
        this.router.navigate(['login']);
        this._snackBar.open("You need a valid token to access this page.", "Ok");
        return of(null);
      })
    ).subscribe();
  }

  onSubmit() {
    let password = this.passwordResetForm.controls['password'].value;
    if (!password || !this.token) return;

    this.authService.resetPassword(password, this.token).pipe(tap(
      response => {
        console.log(response);
        this.router.navigate(['login']);
        this._snackBar.open("Password reset successful. You may now log in.", "Ok");
      }
    ),catchError(err => {
      console.log(err)
      this._snackBar.open("Password reset unsuccessful.", "Ok");
      this.router.navigate(['login']);
      return of(null);
    })).subscribe();
  }
}
