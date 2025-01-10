import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spin-bar-dialog',
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './spin-bar-dialog.component.html',
  styleUrl: './spin-bar-dialog.component.css'
})
export class SpinBarDialogComponent {

  constructor(public dialogRef: MatDialogRef<SpinBarDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { text: string }) {
    dialogRef.disableClose = true;
  }
}
