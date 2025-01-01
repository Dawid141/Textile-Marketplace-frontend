import { Component } from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {Offer} from '../../../models/interface/listingData';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {NgIf} from '@angular/common';

@Component({
    selector: 'app-main-page',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatGridList,
    MatGridTile,
    NgIf
  ],
    templateUrl: './single-offer.component.html',
    standalone: true,
    styleUrl: './single-offer.component.css'
})
export class SingleOfferComponent {
  offer : Offer = {data: [{
      id: 1,
      imageLink: "http://via.placeholder.com/150",
      productName: 'linen',
      shortDescription: 'idk idk test'
,      longDescription: 'idk idk idk idk idk idk idk idk idk idk idk',
      price: 150.50,
      quantity: 15
}]};

}
