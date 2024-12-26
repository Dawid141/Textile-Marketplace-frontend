import { Component, inject, OnInit } from '@angular/core';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { Iuser } from '../../models/interface/myAccount';
import { MyaccountService } from '../../services/myaccount.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-my-account',
  imports: [
    MatGridList,
    MatGridTile,
    NgIf
  ],
  templateUrl: './my-account.component.html',
  standalone: true,
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {


  userDataList: Iuser | null  = null;
  private myAccountService = inject(MyaccountService);

  ngOnInit(): void {

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiQVVUSCIsInN1YiI6InRlc3RhbXpuc2VzQGdtYWlsLmNvbSIsImlhdCI6MTczNTEyMzIwMiwiZXhwIjoxNzM1MjA5NjAyfQ.c-xeCqU3E_1_cjPeFuS7e2gvRWV79JHZk0mu0kPb8eH-owFgxYWZNF2b0kNZzoMGdJLyhVuO1bgyPd3olYK5YA";

    this.myAccountService.getUserByData(token).subscribe(
      (response: any) => {
        this.userDataList = response.data;
      },
      error => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
