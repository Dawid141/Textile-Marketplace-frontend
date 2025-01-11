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
import {MatDialog} from '@angular/material/dialog';
import {NegotiationDialogWindowComponent} from '../DialogWindows/negotiation-dialog-window/negotiation-dialog-window.component';
import {ConfirmDialogComponent} from '../DialogWindows/confirm-dialog/confirm-dialog.component';


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
    private actionButtonsService: ActionButtonsService,
    public dialog: MatDialog,
    public doubleConfirmation: MatDialog,
) {}

  orderListingDetails: OrderListing = { listingData: [] };
  groupedData: any[] = [];
  filteredData: any[] = [];
  selectedStatuses: string[] = [];

  displayColumns: Array<string> = [
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
    const grouped: { [key: number]: { listingId: number; items: OrderListingDetails[]; totalOrderQuantity: number } } = {};

    data.forEach((current) => {
      if (!grouped[current.listingId]) {
        grouped[current.listingId] = {
          listingId: current.listingId,
          items: [],
          totalOrderQuantity: 0,
        };
      }
      grouped[current.listingId].items.push(current);
      grouped[current.listingId].totalOrderQuantity += current.orderQuantity || 0; // Sumuje orderQuantity
    });

    return Object.values(grouped).sort((a, b) => {
      if (a.totalOrderQuantity === 0 && b.totalOrderQuantity > 0) {
        return 1;
      }
      if (b.totalOrderQuantity === 0 && a.totalOrderQuantity > 0) {
        return -1;
      }
      return 0;
    });
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

    this.filteredData = this.filteredData.sort((a, b) => {
      const aTotalOrderQuantity = a.items.reduce((sum: number, item: OrderListingDetails) => sum + (item.orderQuantity || 0), 0);
      const bTotalOrderQuantity = b.items.reduce((sum: number, item: OrderListingDetails) => sum + (item.orderQuantity || 0), 0);

      if (aTotalOrderQuantity === 0 && bTotalOrderQuantity > 0) {
        return 1;
      }
      if (bTotalOrderQuantity === 0 && aTotalOrderQuantity > 0) {
        return -1;
      }
      return 0;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500';
      case 'BUYER_NEGOTIATION':
        return 'text-blue';
      case 'SELLER_NEGOTIATION':
        return 'text-blue';
      case 'ACCEPTED':
        return 'text-green';
      case 'REJECTED':
        return 'text-red';
      default:
        return 'text-gray-500';
    }
  }

  getDisplayStatus(status: string): string {
    if (status === 'BUYER_NEGOTIATION' || status === 'SELLER_NEGOTIATION') {
      return 'NEGOTIATION';
    }
    return status;
  }

  acceptOrder(orderId: number): void {
    const dialogRef = this.doubleConfirmation.open(ConfirmDialogComponent, {
      data: {
        title: 'Attention!',
        message: 'Do you want to accept the buyer\'s offer?',
        orderId: orderId,
        onConfirm: this.handleAcceptOrder.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleAcceptOrder(orderId);
        this.ngOnInit();
      }
    });
  }

  rejectOrder(orderId: number): void {
    const dialogRef = this.doubleConfirmation.open(ConfirmDialogComponent, {
      data: {
        title: 'Attention!',
        message: 'Do you want to reject the buyer\'s offer?',
        orderId: orderId,
        onConfirm: this.handleRejectOrder.bind(this)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.handleRejectOrder(orderId);
        this.ngOnInit();
      }
    });
  }

  handleAcceptOrder(orderId: number): void {
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

  handleRejectOrder(orderId: number): void {
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

  //Negotiation window
  openChangePriceDialog(order: any): void {
    const dialogRef = this.dialog.open(NegotiationDialogWindowComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.changePrice(order.id, result);
      }
    });
  }

  changePrice(orderId: number, newPrice: number): void {
    this.actionButtonsService.changeOrderPrice(orderId, newPrice).subscribe({
      next: () => {
        console.log('Price changed successfully');
        this.ngOnInit();
      },
      error: (err) => {
        if (err.status === 400) {
          console.error('Invalid price or bad request', err);
        } else if (err.status === 403) {
          console.error('Unauthorized action', err);
        } else if (err.status === 404) {
          console.error('Order not found', err);
        } else {
          console.error('Failed to change the price', err);
        }
      }
    });
  }
}
