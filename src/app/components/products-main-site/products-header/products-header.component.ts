import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-products-header',
  imports: [
    MatCard,
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatIcon
  ],
  templateUrl: './products-header.component.html',
  standalone: true,
  styleUrl: './products-header.component.css'
})
export class ProductsHeaderComponent {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'desc';
  itemsShowCount = 12;

  SortUpdated(newSort: string) {
    this.sort = newSort;
  }

  ItemsUpdated(itemNew: number){
    this.itemsShowCount = itemNew;
  }

  ColumnsUpdated(columnNum: number) {
    this.columnsCountChange.emit(columnNum);
  }

}
