import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatListOption, MatSelectionList} from '@angular/material/list';
import {NgForOf, NgIf} from '@angular/common';
import {MatSlider, MatSliderRangeThumb, MatSliderThumb} from '@angular/material/slider';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-sidebar-filter',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatSelectionList,
    MatListOption,
    NgForOf,
    NgIf,
    MatSlider,
    FormsModule,
    MatSliderThumb,
    MatSliderRangeThumb,
    MatCheckbox
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

  section1Items = ['POLYESTER', 'COTTON', 'ACRYLIC FIBER','POLYAMIDE','LINEN','VISCOSE','OTHER'];
  section2Items = ['VELOUR', 'VELVET', 'MICROFIBER FABRIC','MICROFIBER KNIT','CHENILLE','BOUCLE','STRUCTURAL FABRIC','ECO LEATHER','OTHER'];
  section3Items = ['EASY CLEAN', 'WATER REPELLENT', 'PET FRIENDLY','RECYCLED','OTHER'];
  section4Items = ['REACH', 'OEKO TEX STANDARD CLASS I', 'OEKO TEX STANDARD CLASS II','OEKO TEX STANDARD CLASS III','OEKO TEX STANDARD CLASS VI',];

  selectedSection1Items: { [key: string]: boolean } = {};
  selectedSection2Items: { [key: string]: boolean } = {};
  selectedSection3Items: { [key: string]: boolean } = {};
  selectedSection4Items: { [key: string]: boolean } = {};

  ngOnInit() {
    this.calculateMaxPrice();
    this.calculateMaxQuantity();
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

  filterProducts() {
    let filtered = this.products;

    filtered = filtered.filter(
      (product) => product.price >= this.minPrice && product.price <= this.maxPriceSelected
    );

    filtered = filtered.filter(
      (product) => product.quantity >= this.minAmount && product.quantity <= this.maxAmountSelected
    );

    // Sections filtering logic remains unchanged
    const isSection1Empty = Object.values(this.selectedSection1Items).every((value) => !value);
    const isSection2Empty = Object.values(this.selectedSection2Items).every((value) => !value);
    const isSection3Empty = Object.values(this.selectedSection3Items).every((value) => !value);
    const isSection4Empty = Object.values(this.selectedSection4Items).every((value) => !value);

    filtered = filtered.filter((product) => {
      const section1Match = this.getSelectedItems(this.selectedSection1Items).includes(product.composition?.toLowerCase());
      const section2Match = this.getSelectedItems(this.selectedSection2Items).includes(product.fabricType?.toLowerCase());
      const section3Match = this.getSelectedItems(this.selectedSection3Items).includes(product.technology?.toLowerCase());
      const section4Match = this.getSelectedItems(this.selectedSection4Items).includes(product.safety?.toLowerCase());

      return (
        (section1Match || isSection1Empty) &&
        (section2Match || isSection2Empty) &&
        (section3Match || isSection3Empty) &&
        (section4Match || isSection4Empty)
      );
    });

    this.filterChange.emit(filtered);
  }

  getSelectedItems(selectedItems: { [key: string]: boolean }): string[] {
    return Object.keys(selectedItems).filter((item) => selectedItems[item]).map((item) => item.toLowerCase());
  }
}
