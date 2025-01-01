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

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiQVVUSCIsInN1YiI6InRlc3RhbXpuc2VzQGdtYWlsLmNvbSIsImlhdCI6MTczNTMyNjQwNywiZXhwIjoxNzM1NDEyODA3fQ.PRsJQktBLZcAzsXFNB9yejTT-AzRQ6H572NM4c4vS_7Qgdl_brhwIBymAMczkUq4iLOBf8wdeYoU7N2jRMtiJQ";

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
