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

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiQVVUSCIsInN1YiI6InRlc3RhbXpuc2VzQGdtYWlsLmNvbSIsImlhdCI6MTczNTI0NDI2OCwiZXhwIjoxNzM1MzMwNjY4fQ.mV61VX1DzPe4CRVACuPJ0aNvWNxDNb-_L6fTQdaXbcFNCJM4b40K3dPG4mOGKSuYva2wm5n6yBj4tT2nhkwFww";

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
