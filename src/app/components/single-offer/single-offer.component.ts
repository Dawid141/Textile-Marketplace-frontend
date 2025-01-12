import {Component, OnInit} from '@angular/core';
import {listingData} from '../../models/interfaces/product/listingData';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {sellerData} from '../../models/interfaces/sellerDetails';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, tap, throwError} from 'rxjs';
import {ProductsService} from '../../services/products.service';
import {OrderService} from '../../services/order.service';
import {BackendResponse} from '../../models/interfaces/backendResponse';
import {OrderCreationRequest} from '../../models/interfaces/order/OrderCreationRequest';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {SpinBarDialogComponent} from '../spin-bar-dialog/spin-bar-dialog.component';

@Component({
    selector: 'app-main-page',
  imports: [
    MatGridList,
    MatGridTile,
    NgIf,
    NgForOf,
    NgClass,
    CurrencyPipe,
    ReactiveFormsModule,
    MatButton,
  ],
    templateUrl: './single-offer.component.html',
    standalone: true,
    styleUrl: './single-offer.component.css'
})


export class SingleOfferComponent implements OnInit {
  selectedImageIndex: number = 0;
  listingData: listingData | null = null;
  id!: string;

  sellerData: sellerData = {
    id: 1,
    email: 'idkidk@gmail.com',
    nip: '123123123',
    company: 'Drutex.SA'
  };

  properties: any[] = [];
  companyProperties = [
    { label: 'Importer', value: this.sellerData.email},
    { label: 'Oryginalna nazwa produktu', value: this.sellerData.company },
  ];

  orderForm = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    yourPrice: new FormControl(0, [Validators.required]),
    yourSuggestions: new FormControl('', [Validators.required])
  });

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private orderService: OrderService, private _snack: MatSnackBar, private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.fetchListingData(this.id);  // Pobranie danych na podstawie id
    });
  }

  fetchListingData(id: string): void {
    this.productsService.getListingById(id).pipe(tap((response: any) => {
        this.listingData = response.data;
        this.updateProperties();
      }),
      catchError((error) => {
        console.error("Fetching user data failed:", error);
        return throwError(() => error);
      })).subscribe()
  }

  updateProperties() {
    if (this.listingData) {
      this.properties = [
        { label: 'Quantity', value: this.listingData.quantity },
        { label: 'Width', value: this.listingData.width },
        { label: 'Material', value: this.listingData.composition },
        { label: 'Composition', value: this.listingData.fabricType },
        { label: 'Colour', value: this.listingData.colour },
        { label: 'Technology', value: this.listingData.technologies },
        { label: 'Safety', value: this.listingData.safetyRequirements }
      ];
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  decreaseQuantity() {
    const currentValue = this.orderForm.get('quantity')?.value || 1;
    if (currentValue > 1) {
      this.orderForm.get('quantity')?.setValue(currentValue - 1);
    }
  }

  increaseQuantity() {
    const currentValue = this.orderForm.get('quantity')?.value || 1;
    const maxStock = this.listingData?.quantity || 0;

    if (currentValue < maxStock) {
      this.orderForm.get('quantity')?.setValue(currentValue + 1);
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.dialog.open(SpinBarDialogComponent, {
        data: {
          text: "Creating order..."
        }
      })
      console.log('Form Data:', this.orderForm.value);
      const order = this.mapFormValuesToOrderDTO();
      this.orderService.createOrderFromProduct(order).pipe(tap((response: BackendResponse) => {
        console.log(response)
        this._snack.open("Order has been created", "Ok")
        this.dialog.closeAll()
        this.router.navigate(['/products'])
      }),
        catchError((error) => {
          console.error("Creating order has failed:", error);
          this._snack.open("Creating your order has failed", "Ok")
          this.dialog.closeAll()
          return throwError(() => error);
        })).subscribe();
    }
  }

  private mapFormValuesToOrderDTO(): OrderCreationRequest {
    return {
      orderQuantity: this.orderForm.controls['quantity'].value as number,
      listingId: this.id,
      price: this.orderForm.controls['yourPrice'].value as number,
      message: this.orderForm.controls['yourSuggestions'].value as string
    }
  }
}
