import {Component, OnInit} from '@angular/core';
import {OrderListing, OrderListingDetails} from '../../models/interface/order.model';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {CurrencyPipe, NgClass, NgIf} from '@angular/common';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-user-orders-panel',
  imports: [
    MatSidenav,
    MatSidenavContainer,
    MatSidenavModule,
    CurrencyPipe,
    MatButton,
    MatCard,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFooterCell,
    MatFooterRow,
    MatFooterRowDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatRow,
    MatRowDef,
    MatTable,
    NgIf,
    RouterLink,
    MatHeaderCellDef,
    MatFooterCellDef,
    NgClass,
    MatMiniFabButton,

  ],
  templateUrl: './my-offers.component.html',
  standalone: true,
  styleUrl: './my-offers.component.css'
})
export class MyOffersComponent implements OnInit {

  orderListingDetails: OrderListing = {listingData: [{
      productImage : "http://via.placeholder.com/150",
      listingName: 'linen',
      id: 1,
      listingQuantity: 100,
      orderQuantity: 2,
      brand:'Drutex.SA',
      listingId: 1, //link here to the product offer
      newOrderPrice: 15,
      oldOrderPrice: 20,
      orderStatus: 'PENDING',
    },
      {
        productImage : "http://via.placeholder.com/150",
        listingName: 'linen',
        id: 2,
        listingQuantity: 100,
        orderQuantity: 5,
        brand:'Butex.SA',
        listingId: 1, //link here to the product offer
        newOrderPrice: 24,
        oldOrderPrice: 20,
        orderStatus: 'ACCEPTED',
      },
      {
        productImage : "http://via.placeholder.com/150",
        listingName: 'linen',
        id: 3,
        listingQuantity: 100,
        orderQuantity: 2,
        brand:'Drutex.SA',
        listingId: 1, //link here to the product offer
        newOrderPrice: 15,
        oldOrderPrice: 20,
        orderStatus: 'REJECTED',
      }]};

  dataSource: Array<OrderListingDetails> = [];
  displayColumns: Array<string> = [
    'productImage',
    'listingName',
    'listingQuantity',
    'oldOrderPrice',
    'orderQuantity',
    'newOrderPrice',
    'orderStatus',
    'Action'
  ];

  ngOnInit() {
    this.dataSource = this.orderListingDetails.listingData;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500'; // Tailwind yellow
      case 'NEGOTIATION':
        return 'text-blue-500'; // Tailwind blue
      case 'ACCEPTED':
        return 'text-green-500'; // Tailwind green
      case 'REJECTED':
        return 'text-red-500'; // Tailwind red
      default:
        return 'text-gray-500'; // Default gray
    }
  }
}
