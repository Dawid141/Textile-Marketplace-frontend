import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {catchError, tap, throwError} from 'rxjs';
import {ProductEnumResponse} from '../../models/interface/productEnumResponse';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgIf, TitleCasePipe} from '@angular/common';

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
    MatOption
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService, private router: Router, private cdr: ChangeDetectorRef) {}

  productForm = new FormGroup({
    productName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.min(1), Validators.required]),
    quantity: new FormControl(null, [Validators.min(1), Validators.required]),
    images: new FormControl([]),
    enumForms: new FormGroup({})
  });

  productEnumsMap: Map<string, string[]> = new Map();

  ngOnInit(): void {
    const group: any = {}

    this.productService.getListingEnums().pipe(tap(response => {
        const responseData: ProductEnumResponse = response.data;

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

  }
}
