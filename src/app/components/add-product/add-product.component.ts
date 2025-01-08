import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {catchError, tap, throwError} from 'rxjs';
import {ProductEnumResponse} from '../../models/interface/productEnumResponse';
import {Router} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgIf, TitleCasePipe} from '@angular/common';
import {ImageUploadComponent} from '../image-upload/image-upload.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-product',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    NgIf,
    TitleCasePipe,
    MatLabel,
    MatError,
    MatOption,
    ImageUploadComponent,
    MatButton
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService, private router: Router, private cdr: ChangeDetectorRef) {}

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    longDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(256)]),
    shortDescription: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2048)]),
    price: new FormControl(null, [Validators.min(1), Validators.required]),
    quantity: new FormControl(null, [Validators.min(1), Validators.required]),
    images: new FormControl<string[]>([], [Validators.maxLength(4)]),
    width: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(99999999.99)]),
    colour: new FormControl('', [Validators.required]),
    enumForms: new FormGroup({})
  });

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
        this.cdr.detectChanges();
    }),
      catchError((error) => {
        console.error("Fetching enums failed:", error);
        this.router.navigate(['/products'])
        return throwError(() => error);
      })).subscribe()

  }

  onSubmit() {
    console.log(this.productForm.value)
  }

  handleImageEvent($event: string[]) {
    this.productForm.get('images')?.setValue($event);
  }

  formatEnum(formEnum: string) {
    return formEnum
      .toLowerCase()
      .split("_")
      .map((word, index, arr) => {
        // Check if the word is a Roman numeral (appears after "class")
        if (
          index === arr.length - 1 && // Last word in the array
          /^i{1,3}|iv|v$/i.test(word) // Matches Roman numerals I, II, III, IV, or V
        ) {
          return word.toUpperCase(); // Keep Roman numerals uppercase
        }
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitalize other words
      })
      .join(" ");
  }

}
