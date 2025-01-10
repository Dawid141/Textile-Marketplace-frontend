import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {ProductsHeaderComponent} from './products-header/products-header.component';
import {ProductSidebarFilterComponent} from './product-sidebar-filter/product-sidebar-filter.component';
import {ProductBoxComponent} from './product-box/product-box.component';
import {listingData} from '../../models/interface/listingData';
import {NgForOf} from '@angular/common';
import {catchError, tap, throwError} from 'rxjs';
import {ProductsService} from '../../services/products.service';

const ROWS_HEIGHT: { [id:number] : number } = {1: 400, 3: 400};

@Component({
  selector: 'app-products',
  imports: [FormsModule, MatDrawer, MatDrawerContainer, MatSidenavModule, MatGridListModule, MatMenuModule, MatButtonModule, MatCardModule, MatIconModule, MatExpansionModule, MatListModule, MatToolbarModule, MatTableModule, ProductsHeaderComponent, ProductSidebarFilterComponent, ProductBoxComponent, NgForOf],
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductsComponent implements OnInit{

  products: listingData[] = [];
  constructor(private productsService: ProductsService) {}
  filteredProducts : listingData[] = [];
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  colCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  ngOnInit() {
    this.filteredProducts = this.products;

    this.productsService.getAllProducts().pipe(
      tap((response: any) => {
        this.products = response.data;
        this.filteredProducts = this.products;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    ).subscribe();
  }

  onPriceRangeChange(priceRange: { min: number; max: number }) {
    this.filteredProducts = this.products.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );
  }

  onFilterChange(filteredProducts: listingData[]) {
    this.filteredProducts = filteredProducts;
  }

}
