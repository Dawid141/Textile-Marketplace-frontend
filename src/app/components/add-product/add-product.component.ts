import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {catchError, tap, throwError, window} from 'rxjs';
import {ProductEnumResponse} from '../../models/interfaces/product/productEnumResponse';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgIf, TitleCasePipe} from '@angular/common';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatButton} from '@angular/material/button';
import {CanDeactivateType} from '../../guards/form-protect.guard';
import {ListingDTO} from '../../models/interfaces/product/ListingDTO';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BackendResponse} from '../../models/interfaces/backendResponse';
import {MatDialog} from '@angular/material/dialog';
import {SpinBarDialogComponent} from '../spin-bar-dialog/spin-bar-dialog.component';
import {ImageUploadService} from '../../services/image-upload.service';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    NgIf,
    MatLabel,
    MatError,
    MatOption,
    ImageUploadComponent,
    MatButton
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit, OnDestroy {

  constructor(public productService: ProductsService, private router: Router, private cdr: ChangeDetectorRef, private _snack: MatSnackBar, private dialog: MatDialog, private imageService: ImageUploadService) {}

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    longDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1024)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(32)]),
    price: new FormControl(0, [Validators.min(1), Validators.required]),
    quantity: new FormControl(0, [Validators.min(1), Validators.required]),
    images: new FormControl<string[]>([], [Validators.maxLength(4)]),
    width: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(99999999.99)]),
    colour: new FormControl('', [Validators.required]),
    enumForms: new FormGroup({
      fabricTypes: new FormControl('', [Validators.required]),
      compositions: new FormControl('', [Validators.required]),
      technologies: new FormControl('', [Validators.required]),
      safetyRequirements: new FormControl('', [Validators.required]),
      exporters: new FormControl('', [Validators.required]),
      originalProductNames: new FormControl('', [Validators.required])
    })
  });

  productPostSuccess = false;
  productEnumsMap: Map<string, string[]> = new Map();

  ngOnInit(): void {
    const group: any = {}

    this.productService.getListingEnums().pipe(tap(response => {
        const responseData: ProductEnumResponse = response.data;

        console.log(response.data)

        Object.entries(responseData).forEach(([key, value]) => {
          this.productEnumsMap.set(key, value);
          group[key] = new FormControl("", [Validators.required])
        });

        console.log(group);

        this.productForm.setControl('enumForms', new FormGroup(group));

        console.log(this.productForm.controls)

        this.cdr.detectChanges();
    }),
      catchError((error) => {
        console.error("Fetching enums failed:", error);
        this.router.navigate(['/products'])
        return throwError(() => error);
      })).subscribe()

  }

  ngOnDestroy(): void {
    const imageArray = this.productForm.controls['images'].value;

    if (!this.productPostSuccess && imageArray && imageArray.length!=0) {
      this.imageService.deleteAllImages(imageArray).subscribe({
        next: () => console.log("Images deleted", "Ok"),
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  onSubmit() {
    const product = this.mapFormToListingDTO();

    if (!product) {
      this._snack.open("An error occurred while posting your product. Check your product", "Ok")
      return;
    }

    this.dialog.open(SpinBarDialogComponent, {
      data: {
        text: "Adding product..."
      }
    });

    console.log(product);

    this.productService.publishProduct(product).subscribe({
      next: (response: BackendResponse) => {
        this.dialog.closeAll();
        this._snack.open(response.message, "Ok");
        this.productPostSuccess = true;
        console.log(this.productPostSuccess);
        this.router.navigate(['products']);
      },
      error: (err: BackendResponse) => {
        this.dialog.closeAll();
        console.log(err);
        this._snack.open(err.data, "Ok");
      },
      complete: () => console.log("Product publish complete")
    });
  }

  handleImageEvent($event: string[]) {
    this.productForm.get('images')?.setValue($event);
  }

  canDeactivate(): CanDeactivateType {
    if (this.productForm.touched && !this.productPostSuccess) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    } else {
      return true;
    }
  }

  camelCaseToRegularText(camelCase: string): string {
    return camelCase
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert a space between lowercase and uppercase letters
      .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
  }

  private mapFormToListingDTO(): ListingDTO | null {
    // probably needs overhaul weird way of mapping the request

    if (this.productForm.valid) {
      const formValues = this.productForm.value;

      return {
        productName: formValues.productName as string,
        shortDescription: formValues.shortDescription as string,
        longDescription: formValues.longDescription as string,
        price: formValues.price as number,
        quantity: formValues.quantity as number,
        images: formValues.images || [],
        fabricType: formValues.enumForms?.fabricTypes as string,
        composition: formValues.enumForms?.compositions as string,
        technologies: formValues.enumForms?.technologies as string,
        safetyRequirements: formValues.enumForms?.safetyRequirements as string,
        exporters: formValues.enumForms?.exporters as string,
        originalProductNames: formValues.enumForms?.originalProductNames as string,
        colour: formValues.colour as string,
        width: formValues.width as number
      };
    }

    return null;
  }


}
