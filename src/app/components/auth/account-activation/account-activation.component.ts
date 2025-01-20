import {AfterContentInit, Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, filter, of, switchMap, tap} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-account-activation',
  imports: [],
  templateUrl: './account-activation.component.html',
  styleUrl: './account-activation.component.css'
})
export class AccountActivationComponent implements AfterContentInit {

  isSuccessful: boolean | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private _snackBar: MatSnackBar) {
  }

  ngAfterContentInit(): void {
    this.route.queryParams.pipe(filter(params => params['token']!=null && params['token']!=undefined),
      switchMap(params => this.authService.activateAccount(params['token']).pipe(
        tap(response => {
          this.isSuccessful = true
          this._snackBar.open("Your account has been activated please log in.", "Ok")
          this.router.navigate(['login'])
        }))),
      catchError(err => {
        console.log(err)
        this.isSuccessful = false;
        this._snackBar.open("An error has occurred while activating your account.", "Ok");
        this.router.navigate(['login']);
        return of(null);
      })
    ).subscribe();
  }

}
