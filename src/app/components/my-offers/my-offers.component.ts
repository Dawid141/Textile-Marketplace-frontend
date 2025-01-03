import {Component, OnInit} from '@angular/core';
import {OrderListing, OrderListingDetails} from '../../models/interface/order.model';
import {MatSidenav, MatSidenavContainer, MatSidenavModule} from '@angular/material/sidenav';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
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
import {MatTooltip} from '@angular/material/tooltip';
import {StatusFilterComponent} from './statusFilter/status-filter/status-filter.component';


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
    NgForOf,
    MatTooltip,
    StatusFilterComponent,

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
        id: 6,
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
        productImage : "http://via.placeholder.com/250",
        listingName: 'super duper test d             ddddddddddddddd',
        id: 5,
        listingQuantity: 21,
        orderQuantity: 37,
        brand:'dupa.sa',
        listingId: 5, //link here to the product offer
        newOrderPrice: 24,
        oldOrderPrice: 20,
        orderStatus: 'NEGOTIATION',
      },
      {
        productImage : "http://via.placeholder.com/150",
        listingName: 'idkidktest',
        id: 4,
        listingQuantity: 20,
        orderQuantity: 15,
        brand:'Futex.SA',
        listingId: 2, //link here to the product offer
        newOrderPrice: 21,
        oldOrderPrice: 28,
        orderStatus: 'PENDING',
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

  groupedData: any[] = [];
  filteredData: any[] = [];
  selectedStatuses: string[] = [];

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
    this.groupedData = this.groupByListingId(this.orderListingDetails.listingData);
    this.filteredData = this.groupedData;
  }

  groupByListingId(data: OrderListingDetails[]): any[] {
    const grouped: { [key: number]: { listingId: number; items: OrderListingDetails[] } } = {};

    data.forEach((current) => {
      if (!grouped[current.listingId]) {
        grouped[current.listingId] = {
          listingId: current.listingId,
          items: [],
        };
      }
      grouped[current.listingId].items.push(current);
    });

    return Object.values(grouped);
  }

  onStatusFilterChange(selectedStatuses: string[]): void {
    this.selectedStatuses = selectedStatuses;

    if (this.selectedStatuses.length > 0) {
      this.filteredData = this.groupedData
        .map((group: { listingId: number; items: OrderListingDetails[] }) => ({
          ...group,
          items: group.items.filter((item: OrderListingDetails) =>
            this.selectedStatuses.includes(item.orderStatus)
          )
        }))
        .filter(group => group.items.length > 0);
    } else {
      this.filteredData = this.groupedData;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500';
      case 'NEGOTIATION':
        return 'text-blue-500';
      case 'ACCEPTED':
        return 'text-green-500';
      case 'REJECTED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }
}
