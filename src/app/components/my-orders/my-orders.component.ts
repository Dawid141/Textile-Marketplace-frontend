import {Component, OnInit} from '@angular/core';
import {Order} from '../../models/interface/order.model';
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
import {catchError, tap, throwError} from 'rxjs';
import {MyOrdersService} from '../../services/my-orders.service';
import {ActionButtonsService} from '../../services/action-buttons.service';
import {MatDialog} from '@angular/material/dialog';
import {NegotiationDialogWindowComponent} from '../DialogWindows/negotiation-dialog-window/negotiation-dialog-window.component';
import {ConfirmDialogComponent} from '../DialogWindows/confirm-dialog/confirm-dialog.component';

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
  order: Order[] = [];
  constructor(
    private myOrdersService: MyOrdersService,
    private actionButtonsService: ActionButtonsService,
    public dialog: MatDialog,
    public doubleConfirmation: MatDialog,
  ) {}

  displayColumns: Array<string> = [
    'productImage',
    'listingName',
    'listingQuantity',
    'oldOrderPrice',
    'orderQuantity',
    'newOrderPrice',
    'orderStatus',
    'action'
  ];

  ngOnInit(): void {
    this.myOrdersService.getMyOrders().pipe(
      tap((response: any) => {
        this.order = response.data;
        console.log(response.data)
      }),
      catchError((error) => {
        console.error('Błąd podczas pobierania zamówień:', error);
        return throwError(() => error);
      })
    ).subscribe();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500';
      case 'BUYER_NEGOTIATION':
        return 'text-blue-500';
      case 'SELLER_NEGOTIATION':
        return 'text-blue-500';
      case 'ACCEPTED':
        return 'text-green-500';
      case 'REJECTED':
        return 'text-red-500';
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
        message: 'Do you want to accept the seller\'s offer?',
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
        message: 'Do you want to reject the seller\'s offer?',
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
