import {Component, OnInit} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {listingData} from '../../models/interface/listingData';
import {MatGridList, MatGridTile} from '@angular/material/grid-list';
import {CurrencyPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {sellerData} from '../../models/interface/sellerDetails';
import {MatList, MatListItem} from '@angular/material/list';
import {MatDivider} from '@angular/material/divider';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

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
    MatDivider,
    CurrencyPipe,
    ReactiveFormsModule
  ],
    templateUrl: './single-offer.component.html',
    standalone: true,
    styleUrl: './single-offer.component.css'
})


export class SingleOfferComponent implements OnInit {

  selectedImageIndex: number = 0;

  orderForm = new FormGroup({
    quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
    yourPrice: new FormControl('', [Validators.required]),
    yourSuggestions: new FormControl('', [Validators.required])
  });

  listingData : listingData = {
    id: 1,
    imageLink:  [
      "http://via.placeholder.com/150",
      "http://via.placeholder.com/200",
      "http://via.placeholder.com/300x300",
      "http://via.placeholder.com/200",
    ],
    productName: "Product Name123",
    materialType: "Cotton",
    colour: "Red",
    composition: 'cotton 100%',
    safety: 'REACH',
    technology: 'Easy clean',
    shortDescription: "Short description of the product",
    longDescription: "Long description of the product Long description of the product Long description of the product Long description of the product Long description of the product Long description of the product",
    price: 199.99,
    quantity: 10,
    width: '2m'
  };

  sellerData : sellerData = {
    id: 1,
    email: 'idkidk@gmail.com',
    nip: '123123123',
    company: 'Drutex.SA'
  };

  properties = [
    { label: 'Quantity', value: this.listingData.quantity },
    { label: 'Width', value: this.listingData.width },
    { label: 'Material', value: this.listingData.materialType },
    { label: 'Composition', value: this.listingData.composition },
    { label: 'Colour', value: this.listingData.colour },
    { label: 'Technology', value: this.listingData.technology },
    { label: 'Safety', value: this.listingData.safety }
  ];

  companyProperties = [
    { label: 'Email', value: this.sellerData.email},
    { label: 'NIP', value: this.sellerData.nip },
    { label: 'Company', value: this.sellerData.company },
  ];


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
    const maxStock = this.listingData.quantity;

    if (currentValue < maxStock) {
      this.orderForm.get('quantity')?.setValue(currentValue + 1);
    }
  }

  onSubmit() {
    if (this.orderForm.valid) {
      console.log('Form Data:', this.orderForm.value);
    }
  }

  ngOnInit() {
  }

}
