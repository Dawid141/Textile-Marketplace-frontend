import {Component, Input, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {CurrencyPipe, JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {listingData} from '../../../models/interface/listingData';

@Component({
  selector: 'app-product-box',
  imports: [
    MatCard,
    NgOptimizedImage,
    CurrencyPipe,
    MatIcon,
    NgClass,
    MatMiniFabButton,
    RouterLink,
    NgForOf,
    NgIf,
    JsonPipe
  ],
  templateUrl: './product-box.component.html',
  standalone: true,
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = true;
  @Input() products: listingData[] = [];

  ngOnInit() {}
}
