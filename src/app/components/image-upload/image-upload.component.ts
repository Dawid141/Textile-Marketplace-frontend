import {Component, EventEmitter, Output} from '@angular/core';
import {ImageUploadService} from '../../services/image-upload.service';
import {catchError, tap, throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageServiceResponse} from '../../models/interfaces/product/imageServiceResponse';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-image-upload',
  imports: [
    MatProgressSpinner,
    NgOptimizedImage
  ],
  templateUrl: './image-upload.component.html',
  standalone: true,
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  imageArray: string[] = []
  displayAddPhotoButton = true;

  @Output() imageEvent = new EventEmitter<string[]>();

  constructor(private imageService: ImageUploadService, private _snackBar: MatSnackBar) {
  }

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
        console.log(response)
        let url = response.data
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

  deleteImage($index: number) {
    const fileName = this.imageArray[$index].split("/").pop();

    if (!fileName) {
      this._snackBar.open("Error while deleting the image");
      return;
    }

    this.imageService.deleteImage(fileName).subscribe({
      next: () => {
        this._snackBar.open("Image deleted", "Ok");
        this.imageArray.splice($index, 1);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

}
