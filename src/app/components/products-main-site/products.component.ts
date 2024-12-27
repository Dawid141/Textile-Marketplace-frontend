import {Component} from '@angular/core';
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

const ROWS_HEIGHT: { [id:number] : number } = {1: 400, 3: 370, 4: 380};

@Component({
  selector: 'app-products',
  imports: [FormsModule, MatDrawer, MatDrawerContainer, MatSidenavModule, MatGridListModule, MatMenuModule, MatButtonModule, MatCardModule, MatIconModule, MatExpansionModule, MatListModule, MatToolbarModule, MatTableModule, ProductsHeaderComponent, ProductSidebarFilterComponent, ProductBoxComponent],
  templateUrl: './products.component.html',
  standalone: true
})
export class ProductsComponent {

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  colCountChange(colsNumber: number) {
    this.cols = colsNumber;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string) {
    this.category = newCategory;
  }
}
