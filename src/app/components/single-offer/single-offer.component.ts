import {Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {listingData} from '../../models/interface/listingData';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {sellerData} from '../../models/interface/sellerDetails';
import {MatList, MatListItem} from '@angular/material/list';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {ProductsSingleOfferService} from '../../services/single-offer.service';
import {catchError, tap, throwError} from 'rxjs';

@Component({
    selector: 'app-main-page',
  imports: [
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    MatGridList,
    MatGridTile,
    NgIf,
    NgForOf,
    NgClass,
    MatList,
    MatListItem,
    CurrencyPipe,
    ReactiveFormsModule
  ],
    templateUrl: './single-offer.component.html',
    standalone: true,
    styleUrl: './single-offer.component.css'
})


export class SingleOfferComponent implements OnInit {
  selectedImageIndex: number = 0;
  listingData: listingData | null = null;  // Zmienna na dane oferty, początkowo null

  sellerData: sellerData = {
    id: 1,
    email: 'idkidk@gmail.com',
    nip: '123123123',
    company: 'Drutex.SA'
  };

  properties: any[] = [];
  companyProperties = [
    { label: 'Email', value: this.sellerData.email},
    { label: 'NIP', value: this.sellerData.nip },
    { label: 'Company', value: this.sellerData.company },
  ];

  orderForm = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    yourPrice: new FormControl('', [Validators.required]),
    yourSuggestions: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsSingleOfferService  // Wstrzykiwanie serwisu
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.fetchListingData(id);  // Pobranie danych na podstawie id
    });
  }

  fetchListingData(id: string): void {
    this.productService.getListingById(id).pipe(tap((response: any) => {
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
      console.log('Form Data:', this.orderForm.value);
    }
  }
}
