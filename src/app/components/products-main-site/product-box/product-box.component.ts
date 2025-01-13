import {Component, Input, OnInit} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {CurrencyPipe, JsonPipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatMiniFabButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {listingData} from '../../../models/interfaces/product/listingData';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-product-box',
  imports: [
    MatCard,
    CurrencyPipe,
    MatIcon,
    NgClass,
    MatMiniFabButton,
    RouterLink,
    NgForOf,
    NgIf,
  ],
  templateUrl: './product-box.component.html',
  standalone: true,
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent {
  @Input() fullWidthMode = true;
  @Input() products: listingData[] = [];

  formatEnum(formEnum: string): string {
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
