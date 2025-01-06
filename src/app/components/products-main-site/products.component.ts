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

const ROWS_HEIGHT: { [id:number] : number } = {1: 400, 3: 400};

@Component({
  selector: 'app-products',
  imports: [FormsModule, MatDrawer, MatDrawerContainer, MatSidenavModule, MatGridListModule, MatMenuModule, MatButtonModule, MatCardModule, MatIconModule, MatExpansionModule, MatListModule, MatToolbarModule, MatTableModule, ProductsHeaderComponent, ProductSidebarFilterComponent, ProductBoxComponent, NgForOf],
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductsComponent implements OnInit{

  products: listingData[] = [
    {
      id: 1,
      imageLink: [
        "http://via.placeholder.com/150",
        "http://via.placeholder.com/200",
        "http://via.placeholder.com/300x300",
        "http://via.placeholder.com/200"
      ],
      productName: "Product Name 1",
      materialType: "Cotton",
      colour: "Red",
      fabricType: 'Other',
      safety: 'REACH',
      technology: 'Easy clean',
      shortDescription: "Short description of the product 1",
      longDescription: "Long description of the product 1 Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1Long description of the product 1",
      price: 199.99,
      quantity: 10,
      width: '2m'
    },
    {
      id: 2,
      imageLink: [
        "http://via.placeholder.com/250",
        "http://via.placeholder.com/300",
        "http://via.placeholder.com/400x400",
        "http://via.placeholder.com/500"
      ],
      productName: "Product Name 2",
      materialType: "Polyester",
      colour: "Blue",
      fabricType: 'Microfiber Fabric',
      safety: 'OEKO-TEX',
      technology: 'Waterproof',
      shortDescription: "Short description of the product 2",
      longDescription: "Long description of the product 2",
      price: 299.99,
      quantity: 15,
      width: '1.5m'
    },
    {
      id: 3,
      imageLink: [
        "http://via.placeholder.com/300",
        "http://via.placeholder.com/350",
        "http://via.placeholder.com/400x400",
        "http://via.placeholder.com/450"
      ],
      productName: "Product Name 3",
      materialType: "Linen",
      colour: "Green",
      fabricType: 'Other',
      safety: 'REACH',
      technology: 'Anti-static',
      shortDescription: "Short description of the product 3",
      longDescription: "Long description of the product 3",
      price: 499.99,
      quantity: 5,
      width: '1m'
    },
    {
      id: 4,
      imageLink: [
        "http://via.placeholder.com/400",
        "http://via.placeholder.com/450",
        "http://via.placeholder.com/500x500",
        "http://via.placeholder.com/550"
      ],
      productName: "Product Name 4",
      materialType: "Wool",
      colour: "Black",
      fabricType: 'Other',
      safety: 'ISO 9001',
      technology: 'Flame Retardant',
      shortDescription: "Short description of the product 4",
      longDescription: "Long description of the product 4",
      price: 399.99,
      quantity: 8,
      width: '3m'
    },
    {
      id: 5,
      imageLink: [
        "http://via.placeholder.com/500",
        "http://via.placeholder.com/550",
        "http://via.placeholder.com/600x600",
        "http://via.placeholder.com/650"
      ],
      productName: "Product Name 5",
      materialType: "Leather",
      colour: "Brown",
      fabricType: 'Eco Leather',
      safety: 'ISO 14001',
      technology: 'Scratch Resistant',
      shortDescription: "Short description of the product 5",
      longDescription: "Long description of the product 5",
      price: 599.99,
      quantity: 3,
      width: '1.8m'
    },
    {
      id: 6,
      imageLink: [
        "http://via.placeholder.com/600",
        "http://via.placeholder.com/650",
        "http://via.placeholder.com/700x700",
        "http://via.placeholder.com/750"
      ],
      productName: "Product Name 6",
      materialType: "Cotton",
      colour: "Gray",
      fabricType: 'cotton 70%, polyester 30%',
      safety: 'REACH',
      technology: 'Durable',
      shortDescription: "Short description of the product 6",
      longDescription: "Long description of the product 6",
      price: 149.99,
      quantity: 20,
      width: '2.5m'
    }
  ];

  filteredProducts : listingData[] = [];
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];

  colCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  ngOnInit() {
    this.filteredProducts = this.products;
  }

  onPriceRangeChange(priceRange: { min: number; max: number }) {
    this.filteredProducts = this.products.filter(
      (product) => product.price >= priceRange.min && product.price <= priceRange.max
    );
  }

  onFilterChange(filteredProducts: any[]) {
    this.filteredProducts = filteredProducts;
  }
}
