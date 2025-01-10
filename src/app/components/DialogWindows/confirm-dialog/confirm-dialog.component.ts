import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose
  ],
  templateUrl: './confirm-dialog.component.html',
  standalone: true,
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  onConfirm(): void {
    if (this.data.onConfirm) {
      this.data.onConfirm(this.data.orderId);
    }
  }
}
