import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {MatLabel} from '@angular/material/form-field';

@Component({
  selector: 'app-negotiation-dialog-window',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './negotiation-dialog-window.component.html',
  standalone: true,
  styleUrl: './negotiation-dialog-window.component.css'
})
export class NegotiationDialogWindowComponent {
  newPrice: number = 0;
  message: string = '';

  constructor(public dialogRef: MatDialogRef<NegotiationDialogWindowComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    if (this.newPrice > 0 && this.message.trim() !== '') {
      this.dialogRef.close({ price: this.newPrice, message: this.message });
    } else {
      alert('Price must be a positive number and message must not be empty');
    }
  }
}
