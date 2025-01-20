import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Iuser } from '../../models/interfaces/user/myAccount';
import { UserService } from '../../services/user.service';
import {JsonPipe, NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {catchError, tap, throwError} from 'rxjs';

@Component({
  selector: 'app-my-account',
  imports: [
    MatGridList,
    MatGridTile,
    NgIf,
    JsonPipe
  ],
  templateUrl: './my-account.component.html',
  standalone: true,
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {


  userDataList: Iuser | null  = null;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserData().pipe(tap((response: any)=> {
      this.userDataList = response.data;
    }),
      catchError((error) => {
        console.error("Fetching user data failed:", error);
        return throwError(() => error);
      })).subscribe()
  }

  checkSubscriptionValidity(): boolean {
    if (this.userDataList?.subscription.endDate) {
      const endDate = new Date(this.userDataList.subscription.endDate);
      const now = new Date();
      return endDate.getTime() >= now.getTime();
    }
    return false;
  }
}
