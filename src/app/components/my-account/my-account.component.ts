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

    const token = "eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbl90eXBlIjoiQVVUSCIsInN1YiI6InRlc3RhbXpuc2VzQGdtYWlsLmNvbSIsImlhdCI6MTczNTAzMDg2NSwiZXhwIjoxNzM1MTE3MjY1fQ.cqpetLrrUBI36kP4p7fHK6vZ786s3pd28jcXRo6QWKoJQpgpwuNwyCoAV_mp9JY7LWyJSPw6UXV1naCp1XR2Ew";

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
