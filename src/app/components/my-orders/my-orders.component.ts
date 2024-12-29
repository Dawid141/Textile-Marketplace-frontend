import {Component, OnInit} from '@angular/core';
import {Order, OrderData, OrderListing, OrderListingDetails} from '../../models/interface/order.model';
import {MatCard} from '@angular/material/card';
import {MatButton, MatFabButton, MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, NgClass, NgIf} from '@angular/common';
import {
  MatCell, MatCellDef,
  MatColumnDef, MatFooterCell, MatFooterCellDef,
  MatFooterRow,
  MatFooterRowDef, MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-my-orders',
  imports: [
    MatCard,
    MatButton,
    RouterLink,
    NgIf,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatFooterRow,
    MatFooterRowDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatFooterCell,
    MatFooterCellDef,
    CurrencyPipe,
    NgClass,
    MatIcon,
    MatMiniFabButton,
    MatFabButton
  ],
  templateUrl: './my-orders.component.html',
  standalone: true,
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {
  order: Order = {data: [{
      id: 1,
      orderQuantity: 10,
      listingId: 2,
      newOrderPrice: 25,
      orderStatus: 'PENDING'}]};

  orderListingDetails: OrderListing = {listingData: [{
      productImage : "http://via.placeholder.com/150",
      listingName: 'linen',
      id: 1,
      orderQuantity: 2,
      listingId: 1, //link here to the product offer
      newOrderPrice: 15,
      oldOrderPrice: 20,
      orderStatus: 'PENDING',
    },
      {
        productImage : "http://via.placeholder.com/150",
        listingName: 'linen',
        id: 2,
        orderQuantity: 5,
        listingId: 1, //link here to the product offer
        newOrderPrice: 24,
        oldOrderPrice: 222,
        orderStatus: 'ACCEPTED',
      },
      {
        productImage : "http://via.placeholder.com/150",
        listingName: 'linen',
        id: 1,
        orderQuantity: 2,
        listingId: 1, //link here to the product offer
        newOrderPrice: 15,
        oldOrderPrice: 20,
        orderStatus: 'REJECTED',
      }]};
  dataSource: Array<OrderListingDetails> = [];
  displayColumns: Array<string> = [
    'productImage',
    'listingName',
    'orderQuantity',
    'oldOrderPrice',
    'newOrderPrice',
    'orderStatus',
    'Action'
  ];

  ngOnInit() {
    //this.dataSource = this.order.data;
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
