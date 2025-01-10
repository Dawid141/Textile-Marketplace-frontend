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
import {StatusFilterComponent} from './status-filter/status-filter.component';
import {MyOffersService} from '../../services/my-offers.service';
import {catchError, tap, throwError} from 'rxjs';
import {ActionButtonsService} from '../../services/action-buttons.service';


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

  constructor(
    private myOffersService: MyOffersService,
    private actionButtonsService: ActionButtonsService
) {}

  orderListingDetails: OrderListing = { listingData: [] };
  groupedData: any[] = [];
  filteredData: any[] = [];
  selectedStatuses: string[] = [];

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
    this.myOffersService.getMyOffers().pipe(
      tap((response: any) => {
        this.orderListingDetails.listingData = response.data;
        this.groupedData = this.groupByListingId(this.orderListingDetails.listingData);
        this.filteredData = this.groupedData;
      }),
      catchError((error) => {
        console.error('Błąd podczas pobierania zamówień:', error);
        return throwError(() => error);
      })
    ).subscribe();

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

  acceptOrder(orderId: number): void {
    this.actionButtonsService.acceptOrder(orderId).subscribe({
      next: () => {
        console.log("Status changed to accepted");
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Failed to accept the order', err);
      }
    });
  }

  rejectOrder(orderId: number): void {
    this.actionButtonsService.rejectOrder(orderId).subscribe({
      next: () => {
        console.log("Status changed to rejected");
        this.ngOnInit();
      },
      error: (err) => {
        console.error('Failed to reject the order', err);
      }
    });
  }

}
