import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from '@angular/material/slider';
import {FormControl, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {ProductsService} from '../../../services/products.service';
import {catchError, tap, throwError} from 'rxjs';
import {ProductEnumResponse} from '../../../models/interfaces/product/productEnumResponse';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-product-sidebar-filter',
  imports: [
    NgForOf,
    MatSlider,
    FormsModule,
    MatSliderRangeThumb,
    MatCheckbox,
    NgIf,
    MatButton,
    MatIcon
  ],
  templateUrl: './product-sidebar-filter.component.html',
  standalone: true,
  styleUrl: './product-sidebar-filter.component.css'
})
export class ProductSidebarFilterComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  @Input() products: any[] = [];
  @Output() priceRangeChange = new EventEmitter<{ min: number; max: number }>();
  @Output() quantityRangeChange = new EventEmitter<{ min: number; max: number }>();
  @Output() filterChange = new EventEmitter<any>();

  //for sliders
  minPrice = 0;
  maxPrice = 1000;
  maxPriceSelected = this.maxPrice;

  minAmount = 0;
  maxAmount = 100;
  maxAmountSelected = this.maxAmount;

  section1Items: string[] = [];
  section2Items: string[] = [];
  section3Items: string[] = [];
  section4Items: string[] = [];
  section5Items: string[] = [];
  section6Items: string[] = [];

  selectedSection1Items: { [key: string]: boolean } = {};
  selectedSection2Items: { [key: string]: boolean } = {};
  selectedSection3Items: { [key: string]: boolean } = {};
  selectedSection4Items: { [key: string]: boolean } = {};
  selectedSection5Items: { [key: string]: boolean } = {};
  selectedSection6Items: { [key: string]: boolean } = {};

  constructor(private productsService: ProductsService) {}

  dropdowns: { [key: string]: boolean } = {
    originalProductName: false,
    exporter: false,
    fabricComposition: false,
    fabricType: false,
    fabricTechnology: false,
    fabricSafety: false,
  };

  toggleDropdown(section: string): void {
    this.dropdowns[section] = !this.dropdowns[section];
  }

  ngOnInit() {
    this.calculateMaxPrice();
    this.calculateMaxQuantity();
    this.getListingEnums();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['products'] && this.products.length > 0) {
      this.calculateMaxPrice();
      this.calculateMaxQuantity();
    }
  }

  calculateMaxPrice() {
    if (this.products.length > 0) {
      const maxPriceFromProducts = Math.max(...this.products.map((product) => product.price || 0));
      this.maxPrice = Math.ceil(maxPriceFromProducts / 10) * 10;
      this.maxPriceSelected = this.maxPrice;
    }
  }

  calculateMaxQuantity() {
    if (this.products.length > 0) {
      this.maxAmount = Math.max(...this.products.map((product) => product.quantity || 0));
      this.maxAmountSelected = this.maxAmount;
    }
  }

  displayValue(value: number): string {
    return value + ' $';
  }

  onPriceChange() {
    this.priceRangeChange.emit({ min: this.minPrice, max: this.maxPriceSelected });
    this.filterProducts();
  }

  onAmountChange() {
    this.quantityRangeChange.emit({ min: this.minAmount, max: this.maxAmountSelected });
    this.filterProducts();
  }

  onCheckboxChange() {
    this.filterProducts();
  }

  getListingEnums() {
    this.productsService.getListingEnums().pipe(tap(response => {
        const responseData: ProductEnumResponse = response.data;
        console.log(response.data)
        Object.entries(responseData).forEach(([key, values]) => {

          if (key === 'compositions') {
            this.section1Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          } else if (key === 'fabricTypes') {
            this.section2Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          } else if (key === 'technologies') {
            this.section3Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          } else if (key === 'safetyRequirements') {
            this.section4Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          } else if (key === 'originalProductNames') { // Example key for section 5
            this.section5Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          } else if (key === 'exporters') { // Example key for section 6
            this.section6Items.push(...(values as string[]).map(value => this.productsService.formatEnum(value)));
          }
        })
      }),
      catchError((error) => {
        console.error("Fetching enums failed:", error);
        return throwError(() => error);
      })).subscribe()
  }

  filterProducts() {
    let filtered = this.products;

    filtered = filtered.filter(
      (product) => product.price >= this.minPrice && product.price <= this.maxPriceSelected
    );

    filtered = filtered.filter(
      (product) => product.quantity >= this.minAmount && product.quantity <= this.maxAmountSelected
    );

    // Sections filtering logic
    const isSection1Empty = Object.values(this.selectedSection1Items).every((value) => !value);
    const isSection2Empty = Object.values(this.selectedSection2Items).every((value) => !value);
    const isSection3Empty = Object.values(this.selectedSection3Items).every((value) => !value);
    const isSection4Empty = Object.values(this.selectedSection4Items).every((value) => !value);
    const isSection5Empty = Object.values(this.selectedSection5Items).every((value) => !value);
    const isSection6Empty = Object.values(this.selectedSection6Items).every((value) => !value);

    filtered = filtered.filter((product) => {
      console.log(product)
      const section1Match = this.getSelectedItems(this.selectedSection1Items).includes(this.productsService.formatEnum(product.composition));
      const section2Match = this.getSelectedItems(this.selectedSection2Items).includes(this.productsService.formatEnum(product.fabricType));
      const section3Match = this.getSelectedItems(this.selectedSection3Items).includes(this.productsService.formatEnum(product.technologies));
      const section4Match = this.getSelectedItems(this.selectedSection4Items).includes(this.productsService.formatEnum(product.safetyRequirements));
      const section5Match = this.getSelectedItems(this.selectedSection5Items).includes(this.productsService.formatEnum(product.originalProductNames));
      const section6Match = this.getSelectedItems(this.selectedSection6Items).includes(this.productsService.formatEnum(product.exporters));

      return (
        (section1Match || isSection1Empty) &&
        (section2Match || isSection2Empty) &&
        (section3Match || isSection3Empty) &&
        (section4Match || isSection4Empty) &&
        (section5Match || isSection5Empty) &&
        (section6Match || isSection6Empty)
      );
    });

    this.filterChange.emit(filtered);
  }

  getSelectedItems(selectedItems: { [key: string]: boolean }): string[] {
    return Object.keys(selectedItems).filter((item) => selectedItems[item]);
  }

}
