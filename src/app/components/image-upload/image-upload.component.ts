import { Component } from '@angular/core';
import {ImageUploadService} from '../../services/image-upload.service';
import {catchError, tap, throwError} from 'rxjs';
import {BackendResponse} from '../../models/interface/backendResponse';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ImageServiceResponse} from '../../models/interface/imageServiceResponse';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {

  imageUrls: string[] = [];

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
    this.imageService.uploadImage(formData).pipe(tap((response: ImageServiceResponse) => {
        console.log(response.body)
        this.imageUrls.push(response.body);
        console.log(this.imageUrls);
      }),
      catchError((error) => {
        console.error("Image upload failed:", error);
        this._snackBar.open("Image upload failed. Please check your request.", "Ok");
        return throwError(() => error);
      })).subscribe()
  }


}
