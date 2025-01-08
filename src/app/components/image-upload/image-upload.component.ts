import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageUploadService} from '../../services/image-upload.service';
import {catchError, tap, throwError} from 'rxjs';
import {BackendResponse} from '../../models/interface/backendResponse';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageServiceResponse} from '../../models/interface/imageServiceResponse';
import {SpinBarDialogComponent} from '../spin-bar-dialog/spin-bar-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-image-upload',
  imports: [
    MatProgressSpinner,
    NgOptimizedImage
  ],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  imageArray: string[] = []
  displayAddPhotoButton = true;

  @Output() imageEvent = new EventEmitter<string[]>();

  constructor(private imageService: ImageUploadService, private _snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  /*openSpinBarDialog() {
    this.dialog.open(SpinBarDialogComponent);
  }*/

  onFileSubmit(event: any) {
    console.log(event)
    const file = event.srcElement.files[0];

    if (file) {
      let formData = new FormData;
      formData.append("file", file)
      this.uploadImage(formData)
      }
    }

  private uploadImage(formData: FormData) {
    this.displayAddPhotoButton = false;
    this.imageEvent.emit([]); // emit empty array to invalid form so that the user cant click submit during upload

    this.imageService.uploadImage(formData).pipe(tap((response: ImageServiceResponse) => {
        let url = response.body // for some reason the image url gets saved in string quotes
        url = url.replace(/^"(.*)"$/, "$1"); // Removes leading and trailing quotes if present
        this.imageArray.push(url)
        console.log(this.imageArray)
        this.imageEvent.emit(this.imageArray) // emit the populated array
        this.displayAddPhotoButton = true
      }),
      catchError((error) => {
        console.error("Image upload failed:", error);
        this._snackBar.open("Image upload failed. Please check your request.", "Ok");
        this.displayAddPhotoButton = true
        this.imageEvent.emit(this.imageArray) // emit either already populated or empty array
        return throwError(() => error);
      })).subscribe()
  }


  protected readonly Array = Array;
}
