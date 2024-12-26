import {Component, Input} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {CurrencyPipe, NgClass, NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-box',
  imports: [
    MatCard,
    NgOptimizedImage,
    CurrencyPipe,
    MatIcon,
    NgClass
  ],
  templateUrl: './product-box.component.html',
  standalone: true,
  styleUrl: './product-box.component.css'
})
export class ProductBoxComponent {
  @Input() fullWidthMode = true;

}
