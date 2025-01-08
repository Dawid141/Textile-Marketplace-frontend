import { Component } from '@angular/core';
import {MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spin-bar-dialog',
  imports: [
    MatDialogContent,
    MatProgressSpinner
  ],
  templateUrl: './spin-bar-dialog.component.html',
  styleUrl: './spin-bar-dialog.component.css'
})
export class SpinBarDialogComponent {
  constructor(public dialogRef: MatDialogRef<SpinBarDialogComponent>) {
    dialogRef.disableClose = true;
  }
}
